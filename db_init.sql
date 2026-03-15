-- ===== SEED DATA SCRIPT =====
-- Populate database with comprehensive test data

-- Insert ORDER_STATUS
INSERT INTO order_status (code, name, datetime_create, user_create_id) VALUES
('PENDING', 'En attente', CURRENT_DATE, NULL),
('CONFIRMED', 'Confirmée', CURRENT_DATE, NULL),
('IN_PROGRESS', 'En cours', CURRENT_DATE, NULL),
('COMPLETED', 'Complétée', CURRENT_DATE, NULL),
('CANCELLED', 'Annulée', CURRENT_DATE, NULL),
('ARCHIVED', 'Archivée', CURRENT_DATE, NULL);

-- Insert PAYMENT_STATUS
INSERT INTO payment_status (code, name, datetime_create, user_create_id) VALUES
('PENDING', 'En attente', CURRENT_DATE, NULL),
('APPROVED', 'Approuvée', CURRENT_DATE, NULL),
('DECLINED', 'Refusée', CURRENT_DATE, NULL),
('REFUNDED', 'Remboursée', CURRENT_DATE, NULL),
('EXPIRED', 'Expirée', CURRENT_DATE, NULL);

-- Insert PAYOUT_STATUS
INSERT INTO payout_status (code, name, datetime_create, user_create_id) VALUES
('PENDING', 'En attente', CURRENT_DATE, NULL),
('PROCESSING', 'En traitement', CURRENT_DATE, NULL),
('COMPLETED', 'Complétée', CURRENT_DATE, NULL),
('FAILED', 'Échouée', CURRENT_DATE, NULL),
('CANCELLED', 'Annulée', CURRENT_DATE, NULL);

-- Insert EQUIPEMENT_CATEGORY
INSERT INTO equipement_category (code, name, datetime_create, user_create_id) VALUES
('CONSTRUCTION', 'Matériel de Construction', CURRENT_DATE, NULL),
('GARDEN', 'Matériel de Jardin', CURRENT_DATE, NULL),
('EVENTS', 'Équipement d''Événements', CURRENT_DATE, NULL),
('KITCHEN', 'Équipement de Cuisine', CURRENT_DATE, NULL),
('TECH', 'Équipement Technologique', CURRENT_DATE, NULL),
('SPORTS', 'Équipement Sportif', CURRENT_DATE, NULL),
('CLEANING', 'Équipement de Nettoyage', CURRENT_DATE, NULL),
('SAFETY', 'Équipement de Sécurité', CURRENT_DATE, NULL);

-- Insert EQUIPEMENT_TYPE
INSERT INTO equipement_type (equipement_category_id, name, code, datetime_create, user_create_id) VALUES
(1, 'Perceuse', 'DRILL', CURRENT_DATE, NULL),
(1, 'Scie Circulaire', 'CIRCULAR_SAW', CURRENT_DATE, NULL),
(1, 'Compresseur d''Air', 'AIR_COMPRESSOR', CURRENT_DATE, NULL),
(1, 'Échafaudage', 'SCAFFOLDING', CURRENT_DATE, NULL),
(2, 'Tondeuse à Gazon', 'LAWN_MOWER', CURRENT_DATE, NULL),
(2, 'Motoculteur', 'CULTIVATOR', CURRENT_DATE, NULL),
(2, 'Débroussailleuse', 'BRUSH_CUTTER', CURRENT_DATE, NULL),
(3, 'Chapiteau 10x10', 'TENT_10x10', CURRENT_DATE, NULL),
(3, 'Chapiteau 20x20', 'TENT_20x20', CURRENT_DATE, NULL),
(3, 'Tables de Réception', 'EVENT_TABLE', CURRENT_DATE, NULL),
(3, 'Chaises de Réception', 'EVENT_CHAIR', CURRENT_DATE, NULL),
(4, 'Four Professionnel', 'PRO_OVEN', CURRENT_DATE, NULL),
(4, 'Réfrigérateur Professionnel', 'PRO_FRIDGE', CURRENT_DATE, NULL),
(4, 'Plaque de Cuisson', 'COOKING_PLATE', CURRENT_DATE, NULL),
(5, 'Projecteur 1000W', 'PROJECTOR_1000W', CURRENT_DATE, NULL),
(5, 'Drone de Surveillance', 'DRONE', CURRENT_DATE, NULL),
(5, 'Appareil Photo Professionnel', 'PRO_CAMERA', CURRENT_DATE, NULL),
(6, 'Vélo de Route', 'ROAD_BIKE', CURRENT_DATE, NULL),
(6, 'VTT', 'MOUNTAIN_BIKE', CURRENT_DATE, NULL),
(6, 'Trampoline', 'TRAMPOLINE', CURRENT_DATE, NULL),
(7, 'Nettoyeur Haute Pression', 'PRESSURE_WASHER', CURRENT_DATE, NULL),
(7, 'Balai Aspirateur Électrique', 'VACUUM_BROOM', CURRENT_DATE, NULL),
(8, 'Gilet de Sécurité', 'SAFETY_VEST', CURRENT_DATE, NULL),
(8, 'Casque de Sécurité', 'SAFETY_HELMET', CURRENT_DATE, NULL);

-- Insert USERS (25 users)
INSERT INTO "users" (login, email, password, is_admin, is_super_admin, datetime_create) VALUES
('admin_super', 'super@shareo.fr', 'hashed_password_1', true, true, CURRENT_DATE),
('admin_user', 'admin@shareo.fr', 'hashed_password_2', true, false, CURRENT_DATE),
('jean_dupont', 'jean.dupont@email.fr', 'hashed_password_3', false, false, CURRENT_DATE),
('marie_martin', 'marie.martin@email.fr', 'hashed_password_4', false, false, CURRENT_DATE),
('pierre_bernard', 'pierre.bernard@email.fr', 'hashed_password_5', false, false, CURRENT_DATE),
('sophie_robin', 'sophie.robin@email.fr', 'hashed_password_6', false, false, CURRENT_DATE),
('luc_moreau', 'luc.moreau@email.fr', 'hashed_password_7', false, false, CURRENT_DATE),
('claire_garcia', 'claire.garcia@email.fr', 'hashed_password_8', false, false, CURRENT_DATE),
('thomas_simon', 'thomas.simon@email.fr', 'hashed_password_9', false, false, CURRENT_DATE),
('nathalie_laurent', 'nathalie.laurent@email.fr', 'hashed_password_10', false, false, CURRENT_DATE),
('olivier_richard', 'olivier.richard@email.fr', 'hashed_password_11', false, false, CURRENT_DATE),
('isabelle_petit', 'isabelle.petit@email.fr', 'hashed_password_12', false, false, CURRENT_DATE),
('david_durand', 'david.durand@email.fr', 'hashed_password_13', false, false, CURRENT_DATE),
('carole_mercier', 'carole.mercier@email.fr', 'hashed_password_14', false, false, CURRENT_DATE),
('xavier_vincent', 'xavier.vincent@email.fr', 'hashed_password_15', false, false, CURRENT_DATE),
('amelie_fournier', 'amelie.fournier@email.fr', 'hashed_password_16', false, false, CURRENT_DATE),
('julien_devaux', 'julien.devaux@email.fr', 'hashed_password_17', false, false, CURRENT_DATE),
('margot_bonnet', 'margot.bonnet@email.fr', 'hashed_password_18', false, false, CURRENT_DATE),
('benjamin_rousseau', 'benjamin.rousseau@email.fr', 'hashed_password_19', false, false, CURRENT_DATE),
('valentine_daniel', 'valentine.daniel@email.fr', 'hashed_password_20', false, false, CURRENT_DATE),
('lucas_henry', 'lucas.henry@email.fr', 'hashed_password_21', false, false, CURRENT_DATE),
('pauline_leclerc', 'pauline.leclerc@email.fr', 'hashed_password_22', false, false, CURRENT_DATE),
('matthieu_lefevre', 'matthieu.lefevre@email.fr', 'hashed_password_23', false, false, CURRENT_DATE),
('esther_michel', 'esther.michel@email.fr', 'hashed_password_24', false, false, CURRENT_DATE),
('maxime_perrin', 'maxime.perrin@email.fr', 'hashed_password_25', false, false, CURRENT_DATE);

-- Insert USER_INFORMATIONS
INSERT INTO user_informations (user_id, name, last_name, street_name, house_number, postcode, city, country, phone, datetime_create) VALUES
(3, 'Jean', 'Dupont', 'Rue de la Paix', 10, '75001', 'Paris', 'France', '01-23-45-67-89', CURRENT_DATE),
(4, 'Marie', 'Martin', 'Avenue des Champs', 25, '75008', 'Paris', 'France', '01-34-56-78-90', CURRENT_DATE),
(5, 'Pierre', 'Bernard', 'Boulevard Saint-Germain', 42, '75006', 'Paris', 'France', '01-45-67-89-01', CURRENT_DATE),
(6, 'Sophie', 'Robin', 'Rue de Rivoli', 15, '75004', 'Paris', 'France', '01-56-78-90-12', CURRENT_DATE),
(7, 'Luc', 'Moreau', 'Avenue Montaigne', 8, '75008', 'Paris', 'France', '01-67-89-01-23', CURRENT_DATE),
(8, 'Claire', 'Garcia', 'Rue de la Provence', 33, '75009', 'Paris', 'France', '01-78-90-12-34', CURRENT_DATE),
(9, 'Thomas', 'Simon', 'Boulevard Haussmann', 20, '75009', 'Paris', 'France', '01-89-01-23-45', CURRENT_DATE),
(10, 'Nathalie', 'Laurent', 'Rue Saint-Honoré', 12, '75001', 'Paris', 'France', '01-90-12-34-56', CURRENT_DATE),
(11, 'Olivier', 'Richard', 'Avenue de l''Opéra', 30, '75002', 'Paris', 'France', '01-11-23-34-45', CURRENT_DATE),
(12, 'Isabelle', 'Petit', 'Rue de Turenne', 7, '75003', 'Paris', 'France', '01-22-34-45-56', CURRENT_DATE),
(15, 'Xavier', 'Vincent', 'Place Vendôme', 5, '75001', 'Paris', 'France', '01-44-55-66-77', CURRENT_DATE),
(16, 'Amélie', 'Fournier', 'Rue Taitbout', 18, '75009', 'Paris', 'France', '01-55-66-77-88', CURRENT_DATE),
(17, 'Julien', 'Devaux', 'Boulevard Malesherbes', 22, '75008', 'Paris', 'France', '01-66-77-88-99', CURRENT_DATE),
(18, 'Margot', 'Bonnet', 'Avenue George V', 16, '75008', 'Paris', 'France', '01-77-88-99-00', CURRENT_DATE),
(19, 'Benjamin', 'Rousseau', 'Rue du Faubourg Saint-Honoré', 29, '75008', 'Paris', 'France', '01-88-99-00-11', CURRENT_DATE);

-- Insert COMPANIES (10 companies)
INSERT INTO company (name, description, siret, tva_number, legal_form, street_name, house_number, postcode, city, country, latitude, longitude, phone, email, website, datetime_create) VALUES
('Construction Pro', 'Matériel de construction professionnel', '12345678901234', 'FR12345678901', 'SARL', 'Rue de l''Industrie', 100, '75010', 'Paris', 'France', 48.8566, 2.3522, '01-20-30-40-50', 'contact@constructionpro.fr', 'www.constructionpro.fr', CURRENT_DATE),
('Garden Masters', 'Location de matériel de jardinage', '23456789012345', 'FR23456789012', 'SAS', 'Avenue du Luxembourg', 50, '94200', 'Ivry-sur-Seine', 'France', 48.8155, 2.3763, '01-31-41-51-61', 'info@gardenmasters.fr', 'www.gardenmasters.fr', CURRENT_DATE),
('Event Rental Plus', 'Équipement d''événements et réceptions', '34567890123456', 'FR34567890123', 'EIRL', 'Boulevard de Strasbourg', 75, '75010', 'Paris', 'France', 48.8487, 2.3598, '01-42-52-62-72', 'events@rentalplus.fr', 'www.rentalplus.fr', CURRENT_DATE),
('Tech Solutions', 'Équipement technologique et audiovisuel', '45678901234567', 'FR45678901234', 'Micro-entreprise', 'Rue de Montreuil', 88, '75011', 'Paris', 'France', 48.8508, 2.3951, '01-53-63-73-83', 'tech@solutions.fr', 'www.techsolutions.fr', CURRENT_DATE),
('Sports & Loisirs', 'Équipement sportif et de loisirs', '56789012345678', 'FR56789012345', 'Association', 'Avenue de la République', 120, '75011', 'Paris', 'France', 48.8627, 2.3717, '01-64-74-84-94', 'sports@loisirs.fr', 'www.sports-loisirs.fr', CURRENT_DATE),
('Pro Cuisine', 'Équipement de cuisine professionnelle', '67890123456789', 'FR67890123456', 'SARL', 'Rue Claude Bernard', 12, '75005', 'Paris', 'France', 48.8389, 2.3516, '01-75-85-95-05', 'cuisine@pro.fr', 'www.procuisine.fr', CURRENT_DATE),
('Nettoyage Pro', 'Équipement de nettoyage professionnel', '78901234567890', 'FR78901234567', 'EIRL', 'Rue de Belleville', 200, '75020', 'Paris', 'France', 48.8719, 2.3884, '01-86-96-06-16', 'contact@nettoyagepro.fr', 'www.nettoyagepro.fr', CURRENT_DATE),
('Safety First', 'Équipement de sécurité', '89012345678901', 'FR89012345678', 'SAS', 'Boulevard de Courcelles', 88, '75017', 'Paris', 'France', 48.8766, 2.3037, '01-97-07-17-27', 'safety@first.fr', 'www.safetyfirst.fr', CURRENT_DATE),
('Regional Equipment', 'Équipement général', '90123456789012', 'FR90123456789', 'SARL', 'Rue de Vaugirard', 150, '75015', 'Paris', 'France', 48.8402, 2.3088, '01-08-18-28-38', 'info@regional.fr', 'www.regional-equipment.fr', CURRENT_DATE),
('Quality Rentals', 'Location d''équipement qualité', '01234567890123', 'FR01234567890', 'SIRET', 'Avenue de Saxe', 45, '75007', 'Paris', 'France', 48.8482, 2.2945, '01-19-29-39-49', 'quality@rentals.fr', 'www.qualityrentals.fr', CURRENT_DATE);

-- Insert USER_COMPANY relationships
INSERT INTO user_company (user_id, company_id, datetime_create) VALUES
(3, 1, CURRENT_DATE),
(4, 1, CURRENT_DATE),
(5, 2, CURRENT_DATE),
(6, 2, CURRENT_DATE),
(7, 3, CURRENT_DATE),
(8, 3, CURRENT_DATE),
(9, 4, CURRENT_DATE),
(10, 4, CURRENT_DATE),
(11, 5, CURRENT_DATE),
(12, 5, CURRENT_DATE),
(13, 6, CURRENT_DATE),
(14, 6, CURRENT_DATE),
(15, 7, CURRENT_DATE),
(16, 8, CURRENT_DATE),
(17, 9, CURRENT_DATE),
(18, 10, CURRENT_DATE),
(19, 1, CURRENT_DATE),
(20, 2, CURRENT_DATE),
(21, 3, CURRENT_DATE),
(22, 4, CURRENT_DATE);

-- Insert EQUIPEMENT_COMPANY (50 equipment items)
INSERT INTO equipement_company (company_id, equipement_type_id, display_name, description, price_per_day, stock, datetime_create) VALUES
(1, 1, 'Perceuse DeWalt DCD791D2', 'Perceuse compacte 12V', 15.00, 8, CURRENT_DATE),
(1, 1, 'Perceuse Bosch PSB 680RE', 'Perceuse puissante 680W', 25.00, 5, CURRENT_DATE),
(1, 2, 'Scie Circulaire Makita 5007MG', 'Scie circulaire professionnelle', 35.00, 4, CURRENT_DATE),
(1, 3, 'Compresseur Fiac AB 100', 'Compresseur 100L 3CV', 50.00, 2, CURRENT_DATE),
(1, 4, 'Échafaudage aluminium 6m', 'Système d''échafaudage complet', 80.00, 3, CURRENT_DATE),
(2, 5, 'Tondeuse Honda HRG466', 'Tondeuse à essence 46cm', 30.00, 6, CURRENT_DATE),
(2, 5, 'Tondeuse électrique Bosch', 'Tondeuse électrique 1400W', 20.00, 7, CURRENT_DATE),
(2, 6, 'Motoculteur Mc Cullogh', 'Motoculteur 7CV essence', 45.00, 3, CURRENT_DATE),
(2, 7, 'Débroussailleuse Husqvarna', 'Débroussailleuse thermique', 25.00, 5, CURRENT_DATE),
(2, 7, 'Débroussailleuse électrique', 'Débroussailleuse électrique 1800W', 15.00, 8, CURRENT_DATE),
(3, 8, 'Chapiteau 10x10 blanc', 'Chapiteau pagode 10x10m PVC', 150.00, 2, CURRENT_DATE),
(3, 9, 'Chapiteau 20x20 blanc', 'Chapiteau pagode 20x20m PVC', 300.00, 1, CURRENT_DATE),
(3, 10, 'Tables 1.8m blanc', 'Table de réception rectangulaire', 10.00, 50, CURRENT_DATE),
(3, 10, 'Tables 1.2m blanc', 'Table de réception pliante', 8.00, 40, CURRENT_DATE),
(3, 11, 'Chaises Régina blanc', 'Chaise de réception confortable', 2.00, 200, CURRENT_DATE),
(3, 11, 'Tabourets hauts', 'Tabouret de bar 65cm', 3.00, 100, CURRENT_DATE),
(4, 15, 'Projecteur 1000W Osram', 'Projecteur HQI 1000W', 75.00, 4, CURRENT_DATE),
(4, 15, 'Projecteur LED 1000W', 'Projecteur LED professionnel', 85.00, 3, CURRENT_DATE),
(4, 16, 'Drone DJI Phantom 4', 'Drone de surveillance 4K', 120.00, 2, CURRENT_DATE),
(4, 17, 'Canon 5D Mark IV', 'Appareil photo professionnel', 200.00, 1, CURRENT_DATE),
(5, 18, 'Vélo Specialized Allez', 'Vélo de route carbone', 40.00, 12, CURRENT_DATE),
(5, 19, 'VTT Specialized Hardrock', 'VTT tout terrain', 35.00, 15, CURRENT_DATE),
(5, 20, 'Trampoline 4m', 'Trampoline de loisirs', 60.00, 5, CURRENT_DATE),
(6, 12, 'Four Valoriani Oval 100', 'Four à pizza professionnel', 250.00, 1, CURRENT_DATE),
(6, 13, 'Réfrigérateur Polar 600L', 'Réfrigérateur professionnel', 100.00, 2, CURRENT_DATE),
(6, 14, 'Plaque induction Bartscher 3000W', 'Plaque induction professionnelle', 75.00, 3, CURRENT_DATE),
(7, 21, 'Nettoyeur Karcher K7 Full Control', 'Nettoyeur haute pression 160 bar', 40.00, 4, CURRENT_DATE),
(7, 21, 'Nettoyeur Bosch AdvancedAquatak', 'Nettoyeur haute pression 140 bar', 35.00, 5, CURRENT_DATE),
(7, 22, 'Balai aspirateur Kärcher', 'Balai aspirateur électrique', 20.00, 8, CURRENT_DATE),
(8, 23, 'Gilets Belmondo haute visibilité', 'Gilet de sécurité réfléchissant', 3.50, 500, CURRENT_DATE),
(8, 24, 'Casques construction Kask', 'Casque de sécurité ventilé', 8.00, 250, CURRENT_DATE),
(9, 1, 'Perceuse Festool T 18+3', 'Perceuse compacte 18V', 20.00, 6, CURRENT_DATE),
(9, 2, 'Scie circulaire Festool', 'Scie circulaire 1600W', 40.00, 3, CURRENT_DATE),
(10, 5, 'Tondeuse STIGA', 'Tondeuse autoportée 5CV', 60.00, 2, CURRENT_DATE),
(10, 6, 'Motoculteur STAUB', 'Motoculteur 5.5CV', 40.00, 2, CURRENT_DATE),
(1, 3, 'Compresseur Michelin 50L', 'Compresseur 50L 2CV', 35.00, 3, CURRENT_DATE),
(2, 5, 'Tondeuse Stihl RM 248', 'Tondeuse à essence 48cm', 32.00, 5, CURRENT_DATE),
(3, 8, 'Chapiteau 5x5 blanc', 'Petite tente pagode', 75.00, 4, CURRENT_DATE),
(4, 15, 'Projecteur 500W Osram', 'Projecteur HQI 500W', 50.00, 6, CURRENT_DATE),
(5, 18, 'Vélo VTC Trek', 'Vélo tout chemin', 30.00, 20, CURRENT_DATE),
(6, 12, 'Four compact Mugnaini', 'Four à pizza compact', 150.00, 2, CURRENT_DATE),
(7, 21, 'Nettoyeur compact Kärcher', 'Nettoyeur haute pression 100 bar', 25.00, 6, CURRENT_DATE),
(8, 23, 'Gilets fluo enfant', 'Gilet enfant haute visibilité', 2.50, 300, CURRENT_DATE),
(9, 4, 'Échafaudage roulant', 'Tour d''échafaudage mobile', 60.00, 4, CURRENT_DATE),
(10, 10, 'Tables rondes 1.2m', 'Table ronde blanche', 12.00, 30, CURRENT_DATE);

-- Insert DOMAINS (15 locations)
INSERT INTO domain (company_id, name, description, street_name, house_number, postcode, city, country, latitude, longitude, price_per_day, capacity, datetime_create) VALUES
(1, 'Entrepôt Paris 10', 'Grand entrepôt de stockage', 'Rue de Turigo', 50, '75010', 'Paris', 'France', 48.8719, 2.3563, 100.00, 500, CURRENT_DATE),
(1, 'Showroom Popincourt', 'Showroom d''exposition', 'Boulevard Richard-Lenoir', 100, '75011', 'Paris', 'France', 48.8627, 2.3717, 80.00, 200, CURRENT_DATE),
(2, 'Parc de stockage Ivry', 'Parc de stockage extérieur', 'Rue Michelet', 45, '94200', 'Ivry-sur-Seine', 'France', 48.8155, 2.3763, 60.00, 1000, CURRENT_DATE),
(2, 'Serre stockage Créteil', 'Serre couverte semi-fermée', 'Avenue de Verdun', 88, '94000', 'Créteil', 'France', 48.7829, 2.4557, 50.00, 2000, CURRENT_DATE),
(3, 'Hall événements Paris 12', 'Grand hall pour événements', 'Rue de Bercy', 120, '75012', 'Paris', 'France', 48.8310, 2.3830, 200.00, 1500, CURRENT_DATE),
(3, 'Salle de présentation', 'Petite salle de présentation', 'Avenue Daumesnil', 200, '75012', 'Paris', 'France', 48.8365, 2.4013, 150.00, 300, CURRENT_DATE),
(4, 'Studio audiovisuel', 'Studio de 500m² équipé', 'Rue Sébastien-Bottin', 7, '75007', 'Paris', 'France', 48.8482, 2.2945, 180.00, 400, CURRENT_DATE),
(5, 'Piste sportive intérieure', 'Hall sportif couvert', 'Rue de la Paix', 150, '75002', 'Paris', 'France', 48.8704, 2.3398, 120.00, 800, CURRENT_DATE),
(6, 'Cuisine d''apprentissage', 'Cuisine professionnelle', 'Rue de l''École de Médecine', 6, '75006', 'Paris', 'France', 48.8392, 2.3434, 140.00, 50, CURRENT_DATE),
(7, 'Centre de nettoyage', 'Centre spécialisé nettoyage', 'Rue de la Faisanderie', 12, '75016', 'Paris', 'France', 48.8660, 2.2793, 70.00, 100, CURRENT_DATE),
(8, 'Parc de sécurité', 'Zone dédiée à la sécurité', 'Boulevard Murat', 88, '75016', 'Paris', 'France', 48.8470, 2.2724, 50.00, 200, CURRENT_DATE),
(9, 'Hangar multifonctions', 'Grand hangar flexible', 'Rue André-Thomas', 15, '75011', 'Paris', 'France', 48.8584, 2.3957, 110.00, 2000, CURRENT_DATE),
(10, 'Showroom location', 'Showroom d''exposition', 'Rue du Pont-Neuf', 8, '75001', 'Paris', 'France', 48.8564, 2.3372, 95.00, 250, CURRENT_DATE),
(1, 'Atelier réparation', 'Atelier de maintenance', 'Rue du Temple', 75, '75003', 'Paris', 'France', 48.8629, 2.3614, 85.00, 150, CURRENT_DATE),
(3, 'Dépôt Versailles', 'Dépôt de stockage Versailles', 'Rue des Réservoirs', 10, '78000', 'Versailles', 'France', 48.8040, 2.1305, 55.00, 1200, CURRENT_DATE);

-- Insert ORDERS and related data
-- Order 1: User 3, Status Completed
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (3, 4, CURRENT_DATE - INTERVAL '30 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(1, 1, 1, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE - INTERVAL '24 days', 15.00, CURRENT_DATE - INTERVAL '30 days'),
(1, 3, 2, CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE - INTERVAL '25 days', 25.00, CURRENT_DATE - INTERVAL '30 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (1, 340.00, 2, 'Stripe', CURRENT_DATE - INTERVAL '30 days');
INSERT INTO company_payout (company_id, order_item_id, amount, payout_status_id, datetime_create) VALUES 
(1, 1, 150.00, 3, CURRENT_DATE - INTERVAL '15 days'),
(1, 2, 190.00, 3, CURRENT_DATE - INTERVAL '15 days');

-- Order 2: User 4, Status In Progress
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (4, 3, CURRENT_DATE - INTERVAL '10 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(2, 6, 3, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '20 days', 30.00, CURRENT_DATE - INTERVAL '10 days'),
(2, 7, 2, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '5 days', 20.00, CURRENT_DATE - INTERVAL '10 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (2, 1300.00, 2, 'PayPal', CURRENT_DATE - INTERVAL '10 days');

-- Order 3: User 5, Status Pending
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (5, 1, CURRENT_DATE - INTERVAL '2 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(3, 11, 1, CURRENT_DATE + INTERVAL '5 days', CURRENT_DATE + INTERVAL '12 days', 150.00, CURRENT_DATE - INTERVAL '2 days'),
(3, 15, 50, CURRENT_DATE + INTERVAL '5 days', CURRENT_DATE + INTERVAL '12 days', 2.00, CURRENT_DATE - INTERVAL '2 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (3, 1200.00, 1, 'Carte Bancaire', CURRENT_DATE - INTERVAL '2 days');

-- Order 4: User 6, Status Confirmed
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (6, 2, CURRENT_DATE - INTERVAL '5 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(4, 18, 1, CURRENT_DATE + INTERVAL '10 days', CURRENT_DATE + INTERVAL '15 days', 120.00, CURRENT_DATE - INTERVAL '5 days'),
(4, 20, 1, CURRENT_DATE + INTERVAL '10 days', CURRENT_DATE + INTERVAL '14 days', 200.00, CURRENT_DATE - INTERVAL '5 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (4, 800.00, 2, 'Stripe', CURRENT_DATE - INTERVAL '5 days');

-- Order 5: User 7, Status Completed
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (7, 4, CURRENT_DATE - INTERVAL '45 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(5, 13, 50, CURRENT_DATE - INTERVAL '45 days', CURRENT_DATE - INTERVAL '38 days', 10.00, CURRENT_DATE - INTERVAL '45 days'),
(5, 16, 20, CURRENT_DATE - INTERVAL '45 days', CURRENT_DATE - INTERVAL '38 days', 3.00, CURRENT_DATE - INTERVAL '45 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (5, 560.00, 2, 'PayPal', CURRENT_DATE - INTERVAL '45 days');
INSERT INTO company_payout (company_id, order_item_id, amount, payout_status_id, datetime_create) VALUES 
(3, 5, 350.00, 3, CURRENT_DATE - INTERVAL '30 days'),
(3, 6, 210.00, 3, CURRENT_DATE - INTERVAL '30 days');

-- Order 6: User 8, Status Completed
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (8, 4, CURRENT_DATE - INTERVAL '20 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(6, 25, 1, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '15 days', 250.00, CURRENT_DATE - INTERVAL '20 days'),
(6, 26, 2, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '14 days', 75.00, CURRENT_DATE - INTERVAL '20 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (6, 550.00, 2, 'Carte Bancaire', CURRENT_DATE - INTERVAL '20 days');
INSERT INTO company_payout (company_id, order_item_id, amount, payout_status_id, datetime_create) VALUES 
(6, 7, 300.00, 3, CURRENT_DATE - INTERVAL '10 days'),
(6, 8, 250.00, 3, CURRENT_DATE - INTERVAL '10 days');

-- Order 7: User 9, Status Completed
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (9, 4, CURRENT_DATE - INTERVAL '35 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(7, 28, 1, CURRENT_DATE - INTERVAL '35 days', CURRENT_DATE - INTERVAL '30 days', 50.00, CURRENT_DATE - INTERVAL '35 days'),
(7, 30, 4, CURRENT_DATE - INTERVAL '35 days', CURRENT_DATE - INTERVAL '28 days', 40.00, CURRENT_DATE - INTERVAL '35 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (7, 610.00, 2, 'Stripe', CURRENT_DATE - INTERVAL '35 days');
INSERT INTO company_payout (company_id, order_item_id, amount, payout_status_id, datetime_create) VALUES 
(4, 9, 250.00, 3, CURRENT_DATE - INTERVAL '20 days'),
(4, 10, 360.00, 3, CURRENT_DATE - INTERVAL '20 days');

-- Order 8: User 10, Status In Progress
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (10, 3, CURRENT_DATE - INTERVAL '8 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(8, 31, 1, CURRENT_DATE - INTERVAL '8 days', CURRENT_DATE + INTERVAL '22 days', 60.00, CURRENT_DATE - INTERVAL '8 days'),
(8, 33, 3, CURRENT_DATE - INTERVAL '8 days', CURRENT_DATE + INTERVAL '17 days', 35.00, CURRENT_DATE - INTERVAL '8 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (8, 1260.00, 2, 'PayPal', CURRENT_DATE - INTERVAL '8 days');

-- Order 9: User 11, Status Cancelled
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (11, 5, CURRENT_DATE - INTERVAL '15 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(9, 35, 2, CURRENT_DATE + INTERVAL '10 days', CURRENT_DATE + INTERVAL '17 days', 45.00, CURRENT_DATE - INTERVAL '15 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (9, 180.00, 4, 'Carte Bancaire', CURRENT_DATE - INTERVAL '15 days');

-- Order 10: User 12, Status Completed
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (12, 4, CURRENT_DATE - INTERVAL '60 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(10, 39, 1, CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE - INTERVAL '52 days', 150.00, CURRENT_DATE - INTERVAL '60 days'),
(10, 41, 8, CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE - INTERVAL '50 days', 3.50, CURRENT_DATE - INTERVAL '60 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (10, 478.00, 2, 'Stripe', CURRENT_DATE - INTERVAL '60 days');
INSERT INTO company_payout (company_id, order_item_id, amount, payout_status_id, datetime_create) VALUES 
(8, 15, 240.00, 3, CURRENT_DATE - INTERVAL '45 days'),
(8, 16, 238.00, 3, CURRENT_DATE - INTERVAL '45 days');

-- Order 11: User 15, Status Pending
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (15, 1, CURRENT_DATE - INTERVAL '1 day');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(11, 21, 5, CURRENT_DATE + INTERVAL '7 days', CURRENT_DATE + INTERVAL '14 days', 40.00, CURRENT_DATE - INTERVAL '1 day'),
(11, 23, 2, CURRENT_DATE + INTERVAL '7 days', CURRENT_DATE + INTERVAL '12 days', 30.00, CURRENT_DATE - INTERVAL '1 day');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (11, 1400.00, 1, 'PayPal', CURRENT_DATE - INTERVAL '1 day');

-- Order 12: User 16, Status Confirmed
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (16, 2, CURRENT_DATE - INTERVAL '3 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(12, 9, 1, CURRENT_DATE + INTERVAL '8 days', CURRENT_DATE + INTERVAL '13 days', 75.00, CURRENT_DATE - INTERVAL '3 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (12, 375.00, 2, 'Carte Bancaire', CURRENT_DATE - INTERVAL '3 days');

-- Order 13: User 17, Status Completed
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (17, 4, CURRENT_DATE - INTERVAL '50 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(13, 44, 12, CURRENT_DATE - INTERVAL '50 days', CURRENT_DATE - INTERVAL '43 days', 10.00, CURRENT_DATE - INTERVAL '50 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (13, 840.00, 2, 'Stripe', CURRENT_DATE - INTERVAL '50 days');
INSERT INTO company_payout (company_id, order_item_id, amount, payout_status_id, datetime_create) VALUES 
(10, 19, 840.00, 3, CURRENT_DATE - INTERVAL '35 days');

-- Order 14: User 18, Status In Progress
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (18, 3, CURRENT_DATE - INTERVAL '7 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(14, 28, 1, CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE + INTERVAL '23 days', 40.00, CURRENT_DATE - INTERVAL '7 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (14, 1200.00, 2, 'PayPal', CURRENT_DATE - INTERVAL '7 days');

-- Order 15: User 19, Status Archived
INSERT INTO "orders" (user_id, status_id, datetime_create) VALUES (19, 6, CURRENT_DATE - INTERVAL '120 days');
INSERT INTO order_item (order_id, equipement_company_id, quantity, start_date, end_date, unit_price, datetime_create) VALUES
(15, 2, 1, CURRENT_DATE - INTERVAL '120 days', CURRENT_DATE - INTERVAL '115 days', 25.00, CURRENT_DATE - INTERVAL '120 days');
INSERT INTO payment (order_id, amount, payment_status_id, provider, datetime_create) VALUES (15, 125.00, 2, 'Carte Bancaire', CURRENT_DATE - INTERVAL '120 days');
INSERT INTO company_payout (company_id, order_item_id, amount, payout_status_id, datetime_create) VALUES 
(1, 21, 125.00, 3, CURRENT_DATE - INTERVAL '105 days');