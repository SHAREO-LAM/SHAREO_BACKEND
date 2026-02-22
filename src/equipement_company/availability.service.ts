import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';

type UnavailableDateRow = { unavailable_date: string };

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(EquipementCompany)
    private equipementRepository: Repository<EquipementCompany>,
  ) {}

  async getUnavailableDatesForEquipment(
    equipementCompanyId: number,
  ): Promise<string[]> {
    const query = `
      WITH daily_reservations AS (
        SELECT
          gs::date AS day,
          SUM(oi.quantity) AS reserved_quantity
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
          AND oi.equipement_company_id = $1
        GROUP BY gs::date
      )
      SELECT dr.day AS unavailable_date
      FROM daily_reservations dr
      JOIN equipement_company ec
        ON ec.equipement_company_id = $1
      WHERE dr.reserved_quantity >= ec.stock
      ORDER BY dr.day
    `;

    const result: UnavailableDateRow[] = await this.orderItemRepository.query(
      query,
      [equipementCompanyId],
    );

    // On retourne un simple tableau de string 'YYYY-MM-DD'
    return result.map((r) => {
      const d = new Date(r.unavailable_date);
      return d.toISOString().split('T')[0];
    });
  }

  async checkEquipmentAvailability(
    equipementCompanyId: number,
    startDate: string,
    endDate: string,
    quantity: number,
  ): Promise<boolean> {
    const query = `
      WITH daily_reservations AS (
        SELECT
          gs::date AS day,
          COALESCE(SUM(oi.quantity), 0) AS reserved_quantity
        FROM generate_series($2::date, $3::date, interval '1 day') AS gs
        LEFT JOIN order_item oi
          ON gs BETWEEN oi.start_date::date AND oi.end_date::date
          AND oi.equipement_company_id = $1
        LEFT JOIN orders o
          ON o.order_id = oi.order_id
          AND o.status_id NOT IN (1, 5)
        GROUP BY gs
      )
      SELECT dr.day
      FROM daily_reservations dr
      JOIN equipement_company ec
        ON ec.equipement_company_id = $1
      WHERE dr.reserved_quantity + $4 > ec.stock
      OR $2::date < CURRENT_DATE
      LIMIT 1;
    `;

    const result: UnavailableDateRow[] = await this.orderItemRepository.query(
      query,
      [equipementCompanyId, startDate, endDate, quantity],
    );

    return result.length === 0;
  }
}
