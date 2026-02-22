import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { Repository } from 'typeorm';

type UnavailableDateRow = { unavailable_date: string };

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async getUnavailableDates(domainId: number): Promise<string[]> {
    const result: UnavailableDateRow[] = await this.orderItemRepository.query(
      `
        SELECT DISTINCT gs::date AS unavailable_date
        FROM order_item oi
        JOIN orders o
        ON o.order_id = oi.order_id
        CROSS JOIN LATERAL generate_series(
            oi.start_date::date,
            oi.end_date::date,
            interval '1 day'
        ) AS gs
        WHERE oi.start_date >= CURRENT_DATE
        AND o.status_id NOT IN (1, 5)
        AND oi.domain_id = $1
        ORDER BY unavailable_date;
        `,
      [domainId],
    );

    return result.map((r) => {
      const d = new Date(r.unavailable_date);
      return d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    });
  }

  async checkDomainAvailability(
    domainId: number,
    startDate: string,
    endDate: string,
  ): Promise<boolean> {
    const query = `
      SELECT 1
      FROM order_item oi
      JOIN orders o
        ON o.order_id = oi.order_id
      WHERE oi.domain_id = $1
        AND o.status_id NOT IN (1, 5)
        AND (
          oi.start_date::date <= $3::date
          AND oi.end_date::date >= $2::date
          OR $2::date < CURRENT_DATE
        )
      LIMIT 1;
    `;

    const result: UnavailableDateRow[] = await this.orderItemRepository.query(
      query,
      [domainId, startDate, endDate],
    );

    return result.length === 0;
  }
}
