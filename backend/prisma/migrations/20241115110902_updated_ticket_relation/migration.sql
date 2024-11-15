-- DropForeignKey
ALTER TABLE "uts"."replies" DROP CONSTRAINT "replies_userId_fkey";

-- DropForeignKey
ALTER TABLE "uts"."tickets" DROP CONSTRAINT "tickets_senderId_fkey";

-- AlterTable
ALTER TABLE "uts"."tickets" ALTER COLUMN "status" SET DEFAULT 'Sent';

-- CreateTable
CREATE TABLE "public"."sec_system_user" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "biography" VARCHAR(255),
    "email_address" VARCHAR(50),
    "first_name" VARCHAR(50),
    "gender" VARCHAR(10),
    "last_name" VARCHAR(50),
    "national_id" VARCHAR(16),
    "password" VARCHAR(250) NOT NULL,
    "phone_number" VARCHAR(50),
    "status" VARCHAR(255),
    "user_id" VARCHAR(50) NOT NULL,
    "user_image_id" UUID,
    "position" VARCHAR(255),
    "signature" BYTEA,
    "user_type" VARCHAR(50),
    "comments" TEXT,
    "pwd_history" TEXT,
    "institution" VARCHAR(250),
    "otp" VARCHAR(50),
    "otp_time" TIMESTAMP(6),

    CONSTRAINT "sec_system_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ana_data_attribute" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "attribute_description" VARCHAR(255) NOT NULL,
    "attribute_name" VARCHAR(255) NOT NULL,
    "attribute_role" VARCHAR(255) NOT NULL,
    "context" VARCHAR(255) NOT NULL,
    "data_type" VARCHAR(255) NOT NULL,
    "comments" VARCHAR,

    CONSTRAINT "ana_data_attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ast_equipment_owner" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250),
    "comments" TEXT,

    CONSTRAINT "ast_equipment_owner_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ast_fuel_type" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "type" VARCHAR(250) NOT NULL,
    "fiscal_year_id" UUID,
    "rate" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,

    CONSTRAINT "ast_fuel_type_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ast_transport_brand" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250),
    "equipment_type" VARCHAR(50),
    "comments" TEXT,

    CONSTRAINT "ast_transport_brand_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ast_transport_dealer" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250),
    "comments" TEXT,

    CONSTRAINT "ast_transport_dealer_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ast_transport_equipment" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "acquisition_date" DATE,
    "acquisition_mode" VARCHAR(50) NOT NULL,
    "asset_number" VARCHAR(100) NOT NULL,
    "asset_status" VARCHAR(50) NOT NULL,
    "asset_type" VARCHAR(50) NOT NULL,
    "controlling_cost_center_id" UUID NOT NULL,
    "current_value" DECIMAL(20,0) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "initial_value" DECIMAL(20,0) NOT NULL,
    "chasis_number" VARCHAR(50) NOT NULL,
    "manufacturing_year" INTEGER NOT NULL,
    "fuel_type" VARCHAR(50) NOT NULL,
    "useful_life" INTEGER,
    "asset_condition" VARCHAR(20),
    "comment" VARCHAR(1000),
    "valuation_method" VARCHAR(50),
    "transport_type" VARCHAR(50),
    "remaining_useful_life" INTEGER,
    "registration_number" VARCHAR(50) NOT NULL,
    "equipment_type" VARCHAR(50),
    "engine_type" VARCHAR(50),
    "model" VARCHAR(255) NOT NULL,
    "serial_number" VARCHAR(100) NOT NULL,
    "engine_number" VARCHAR(100) NOT NULL,
    "engine_capacity" INTEGER NOT NULL,
    "color" VARCHAR(100) NOT NULL,
    "owner_id" UUID NOT NULL,
    "dealer_id" UUID,
    "brand_id" UUID NOT NULL,
    "mileage" INTEGER NOT NULL,
    "vehicle_type_id" UUID,
    "comments" TEXT,
    "hire_charge_amount" DECIMAL(20,0) NOT NULL DEFAULT 0.0,
    "replacement_value" DECIMAL(20,0) NOT NULL DEFAULT 0.0,
    "veh_type_code" VARCHAR(5),
    "fuel_type_id" UUID,

    CONSTRAINT "ast_other_transport_equipment_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ast_vehicle_budget_component" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(250),
    "budget_type" VARCHAR(20) NOT NULL,
    "economic_id" UUID NOT NULL,
    "comments" TEXT,
    "fuel_type" VARCHAR(50),
    "responsible_rc_id" UUID,

    CONSTRAINT "hr_vehicle_budget_component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ast_vehicle_type" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250),
    "comments" TEXT,
    "previous_daily_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "daily_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "free_daily_kms" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "km_charge" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "previous_km_charge" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "maintanance_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "long_term_hire_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "consumption_rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "ast_vehicle_type_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_activity" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "program_id" UUID,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "rc_id" UUID,
    "parent_id" UUID,
    "description" VARCHAR(500),
    "comments" TEXT,
    "category" TEXT,
    "funder_id" UUID,

    CONSTRAINT "budg_activity_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_administrative_budget_ceiling" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_m3" DECIMAL NOT NULL,
    "budget_m2" DECIMAL NOT NULL,
    "budget_m1" DECIMAL NOT NULL,
    "budget" DECIMAL NOT NULL,
    "proj_out_turn" DECIMAL NOT NULL,
    "budget_p1" DECIMAL NOT NULL,
    "budget_p2" DECIMAL NOT NULL,
    "budget_p3" DECIMAL NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "administrative_id" UUID NOT NULL,
    "level" VARCHAR(255) NOT NULL,
    "prel_out_turn" DECIMAL NOT NULL DEFAULT 0,
    "mid_year" DECIMAL NOT NULL DEFAULT 0,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,
    "ceiling_category_type" VARCHAR(100),
    "bc_sheet_id" UUID,

    CONSTRAINT "budg_administrative_budget_ceiling_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_assumption" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "comments" TEXT,
    "header_id" UUID,

    CONSTRAINT "budg_assumption_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_bfp_currency_rate" (
    "id" UUID NOT NULL,
    "rate" DECIMAL(19,2) NOT NULL,
    "currency_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "comments" TEXT,
    "state" INTEGER,
    "version" BIGINT,

    CONSTRAINT "budg_bfp_currency_rate_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_brief" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "comments" TEXT,
    "administrative_id" UUID NOT NULL,

    CONSTRAINT "budg_budget_brief_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_call_circular" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "action_detail_id" UUID NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_bcc_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_ceiling_item" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_m3" DECIMAL(19,0) NOT NULL,
    "budget_m2" DECIMAL(19,0) NOT NULL,
    "budget_m1" DECIMAL(19,0) NOT NULL,
    "budget" DECIMAL(19,0) NOT NULL,
    "prel_out_turn" DECIMAL(19,0) NOT NULL DEFAULT 0,
    "mid_year" DECIMAL(19,0) NOT NULL DEFAULT 0,
    "proj_out_turn" DECIMAL(19,0) NOT NULL,
    "budget_p1" DECIMAL(19,0) NOT NULL,
    "budget_p2" DECIMAL(19,0) NOT NULL,
    "budget_p3" DECIMAL(19,0) NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "budget_ceiling_id" UUID,
    "category_id" UUID NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,
    "ceiling_category_type" VARCHAR(100),

    CONSTRAINT "budg_budget_ceiling_item_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_framework_paper" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_budget_framework_paper_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_input" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_m3" DECIMAL NOT NULL,
    "budget_m2" DECIMAL NOT NULL,
    "budget_m1" DECIMAL NOT NULL,
    "budget" DECIMAL NOT NULL,
    "proj_out_turn" DECIMAL NOT NULL,
    "budget_p1" DECIMAL NOT NULL,
    "budget_p2" DECIMAL NOT NULL,
    "budget_p3" DECIMAL NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "responsibility_center_id" UUID NOT NULL,
    "economic_detail_id" UUID NOT NULL,
    "prel_out_turn" DECIMAL NOT NULL DEFAULT 0,
    "mid_year" DECIMAL NOT NULL DEFAULT 0,
    "type" VARCHAR(50) NOT NULL,
    "output_id" UUID,
    "activity_id" UUID,
    "program_id" UUID,
    "funder_id" UUID,
    "measurement_unit_id" UUID,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unit_price" DECIMAL NOT NULL DEFAULT 0,
    "quantity_p1" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quantity_p2" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unit_price_p1" DECIMAL NOT NULL DEFAULT 0,
    "unit_price_p2" DECIMAL NOT NULL DEFAULT 0,
    "input" VARCHAR(250),
    "budget_type" VARCHAR(50) NOT NULL DEFAULT 'EXPENDITURE',
    "comments" TEXT,
    "parent_budget_sheet_id" UUID,
    "over_spending_amount" DECIMAL NOT NULL DEFAULT 0,
    "head_id" UUID,
    "agency_id" UUID,
    "ceiling_category_id" UUID,
    "account_number" VARCHAR(255),
    "account_name" VARCHAR(255),
    "automatic_costing" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "budg_budget_input_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_reallocation" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "creation_date" DATE NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "reallocation_number" VARCHAR(255) NOT NULL,
    "reallocated_amount" DECIMAL(19,2) NOT NULL,
    "reallocation_reason" VARCHAR(512) NOT NULL,
    "source_head_id" UUID NOT NULL,
    "source_rc_id" UUID NOT NULL,
    "source_budget_id" UUID NOT NULL,
    "actual_expenditure" DECIMAL(20,0) NOT NULL,
    "approved_budget" DECIMAL(20,0) NOT NULL,
    "is_capital_expenditure" BOOLEAN NOT NULL,
    "is_statutory_expenditure" BOOLEAN NOT NULL,
    "destination_head_id" UUID NOT NULL,
    "destination_rc_id" UUID NOT NULL,
    "destination_budget_id" UUID NOT NULL,
    "action_detail_id" UUID,
    "status" VARCHAR(255) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budget_reallocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_reallocation_document" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_reallocation_id" UUID,
    "document_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_budget_reallocation_document_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_release" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "commitment_plan_id" UUID NOT NULL,
    "head_id" UUID,
    "department_id" UUID NOT NULL,
    "rc_id" UUID NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "action_detail_id" UUID,
    "total_amount" DECIMAL NOT NULL,
    "amount_q1" DECIMAL NOT NULL,
    "amount_q2" DECIMAL NOT NULL,
    "amount_q3" DECIMAL NOT NULL,
    "amount_q4" DECIMAL NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_budget_release_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_release_detail" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_release_id" UUID NOT NULL,
    "economic_id" UUID NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "rc_id" UUID NOT NULL,
    "total_amount" DECIMAL NOT NULL,
    "amount_q1" DECIMAL NOT NULL,
    "amount_q2" DECIMAL NOT NULL,
    "amount_q3" DECIMAL NOT NULL,
    "amount_q4" DECIMAL NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_budget_release_detail_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_budget_sheet" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "level" VARCHAR(255) NOT NULL,
    "administrative_id" UUID,
    "phase" VARCHAR(255) NOT NULL,
    "action_detail_id" UUID,
    "status" VARCHAR(255) NOT NULL,
    "parent_id" UUID,
    "comments" TEXT,
    "ceiling_category_type" VARCHAR(100),
    "budget_type" VARCHAR(50),

    CONSTRAINT "budg_budget_sheet_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_ceiling_category" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "type" VARCHAR(100),
    "comments" TEXT,
    "funder_id" UUID,

    CONSTRAINT "budg_ceiling_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_ceiling_category_economic" (
    "id" UUID NOT NULL,
    "economic_id" UUID,
    "category_id" UUID NOT NULL,
    "comments" TEXT,
    "state" INTEGER NOT NULL DEFAULT 1,
    "version" BIGINT NOT NULL DEFAULT 0,
    "funder_id" UUID,
    "mtef_component" VARCHAR(100),

    CONSTRAINT "budg_ceiling_category_economic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_commitment_plan" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255),
    "commitment_plan_ceiling_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "head_id" UUID,
    "department_id" UUID NOT NULL,
    "rc_id" UUID NOT NULL,
    "ceiling_category_type" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "action_detail_id" UUID,
    "total_amount" DECIMAL NOT NULL,
    "amount_q1" DECIMAL NOT NULL,
    "amount_q2" DECIMAL NOT NULL,
    "amount_q3" DECIMAL NOT NULL,
    "amount_q4" DECIMAL NOT NULL,
    "comments" TEXT,
    "budget_sheet_id" UUID NOT NULL,

    CONSTRAINT "budg_commitment_plan_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_commitment_plan_ceiling" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "head_id" UUID,
    "department_id" UUID,
    "rc_id" UUID NOT NULL,
    "ceiling_category_type" VARCHAR(255) NOT NULL,
    "economic_id" UUID,
    "status" VARCHAR(255) NOT NULL,
    "action_detail_id" UUID NOT NULL,
    "total_amount" DECIMAL NOT NULL,
    "amount_m1" DECIMAL NOT NULL,
    "amount_m2" DECIMAL NOT NULL,
    "amount_m3" DECIMAL NOT NULL,
    "amount_m4" DECIMAL NOT NULL,
    "amount_m5" DECIMAL NOT NULL,
    "amount_m6" DECIMAL NOT NULL,
    "amount_m7" DECIMAL NOT NULL,
    "amount_m8" DECIMAL NOT NULL,
    "amount_m9" DECIMAL NOT NULL,
    "amount_m10" DECIMAL NOT NULL,
    "amount_m11" DECIMAL NOT NULL,
    "amount_m12" DECIMAL NOT NULL,
    "amount_q1" DECIMAL NOT NULL,
    "amount_q2" DECIMAL NOT NULL,
    "amount_q3" DECIMAL NOT NULL,
    "amount_q4" DECIMAL NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_commitment_plan_ceiling_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_commitment_plan_detail" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "commitment_plan_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "rc_id" UUID NOT NULL,
    "ceiling_category_type" VARCHAR(255) NOT NULL,
    "economic_id" UUID NOT NULL,
    "total_amount" DECIMAL NOT NULL,
    "amount_m1" DECIMAL NOT NULL,
    "amount_m2" DECIMAL NOT NULL,
    "amount_m3" DECIMAL NOT NULL,
    "amount_m4" DECIMAL NOT NULL,
    "amount_m5" DECIMAL NOT NULL,
    "amount_m6" DECIMAL NOT NULL,
    "amount_m7" DECIMAL NOT NULL,
    "amount_m8" DECIMAL NOT NULL,
    "amount_m9" DECIMAL NOT NULL,
    "amount_m10" DECIMAL NOT NULL,
    "amount_m11" DECIMAL NOT NULL,
    "amount_m12" DECIMAL NOT NULL,
    "amount_q1" DECIMAL NOT NULL,
    "amount_q2" DECIMAL NOT NULL,
    "amount_q3" DECIMAL NOT NULL,
    "amount_q4" DECIMAL NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_commitment_plan_detail_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_fiscal_framework_paper" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_ffp_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_forwarding_letter" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_forwarding_letter_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_gdp_data" (
    "id" UUID NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "template_id" UUID NOT NULL,
    "parameter_id" UUID NOT NULL,
    "value_m7" DECIMAL NOT NULL,
    "value_m6" DECIMAL NOT NULL,
    "value_m5" DECIMAL NOT NULL,
    "value_m4" DECIMAL NOT NULL,
    "value_m3" DECIMAL NOT NULL,
    "value_m2" DECIMAL NOT NULL,
    "value_m1" DECIMAL NOT NULL,
    "value" DECIMAL NOT NULL,
    "value_p1" DECIMAL NOT NULL,
    "value_p2" DECIMAL NOT NULL,
    "value_p3" DECIMAL NOT NULL,
    "value_p4" DECIMAL NOT NULL,
    "comments" TEXT,
    "bc_sheet_id" UUID,
    "state" INTEGER NOT NULL DEFAULT 1,
    "version" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "budg_gdp_data_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_gdp_file" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_gdp_file_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_gdp_parameter" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "gdp_template_id" UUID,
    "comments" TEXT,
    "usage" VARCHAR(50),

    CONSTRAINT "budg_gdp_parameter_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_gdp_template" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "action_detail_id" UUID,
    "status" VARCHAR(255) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_gdp_template_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_head_budget_ceiling" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_m3" DECIMAL NOT NULL,
    "budget_m2" DECIMAL NOT NULL,
    "budget_m1" DECIMAL NOT NULL,
    "budget" DECIMAL NOT NULL,
    "proj_out_turn" DECIMAL NOT NULL,
    "budget_p1" DECIMAL NOT NULL,
    "budget_p2" DECIMAL NOT NULL,
    "budget_p3" DECIMAL NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "head_id" UUID NOT NULL,
    "prel_out_turn" DECIMAL NOT NULL DEFAULT 0,
    "mid_year" DECIMAL NOT NULL DEFAULT 0,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,
    "ceiling_category_type" VARCHAR(100),
    "bc_sheet_id" UUID,

    CONSTRAINT "budg_budget_ceiling_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_key_achievement" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "rc_id" UUID,
    "comments" TEXT,

    CONSTRAINT "budg_key_achievement_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_key_challenge" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "rc_id" UUID,
    "comments" TEXT,

    CONSTRAINT "budg_key_challenge_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_key_issue" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "outcome_id" UUID,
    "comments" TEXT,

    CONSTRAINT "coa_key_issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_key_performance_indicator" (
    "id" UUID NOT NULL,
    "responsibility_center_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "value_m2" DOUBLE PRECISION NOT NULL,
    "value_m1" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "value_p1" DOUBLE PRECISION NOT NULL,
    "value_p2" DOUBLE PRECISION NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_key_performance_indicator_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_mt_policy_objective" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "rc_id" UUID,
    "comments" TEXT,

    CONSTRAINT "budg_mt_policy_objective_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_mtff_economic" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "economic_id" UUID NOT NULL,
    "mtff_template_id" UUID,
    "comments" TEXT,
    "header_id" UUID,

    CONSTRAINT "budg_mtff_economic_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_mtff_item" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_m3" DECIMAL(19,0) NOT NULL,
    "budget_m2" DECIMAL(19,0) NOT NULL,
    "budget_m1" DECIMAL(19,0) NOT NULL,
    "budget" DECIMAL(19,0) NOT NULL,
    "proj_out_turn" DECIMAL(19,0) NOT NULL,
    "budget_p1" DECIMAL(19,0) NOT NULL,
    "budget_p2" DECIMAL(19,0) NOT NULL,
    "budget_p3" DECIMAL(19,0) NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "mtff_template_id" UUID,
    "economic_category_id" UUID,
    "prel_out_turn" DECIMAL NOT NULL DEFAULT 0,
    "mid_year" DECIMAL NOT NULL DEFAULT 0,
    "comments" TEXT,
    "gdp_parameter_id" UUID,
    "header_id" UUID,
    "bc_sheet_id" UUID,

    CONSTRAINT "budg_mtff_item_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_mtff_parameter" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "mtff_template_id" UUID,
    "comments" TEXT,
    "header_id" UUID,

    CONSTRAINT "budg_mtff_parameter_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_mtff_template" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "reference_number" VARCHAR(255) NOT NULL,
    "action_detail_id" UUID NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "budg_mtff_template_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_national_development_plan" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "start_date" DATE,
    "end_date" DATE,
    "comments" TEXT,

    CONSTRAINT "budg_national_development_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_outcome" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "outcome_type" VARCHAR(20) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "level" INTEGER NOT NULL,
    "parent_id" UUID,
    "plan_id" UUID,
    "program_id" UUID,
    "comments" TEXT,

    CONSTRAINT "coa_outcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_outcome_strategy" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "outcome_id" UUID,
    "comments" TEXT,

    CONSTRAINT "coa_outcome_strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_outcome_target" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "outcome_id" UUID,
    "comments" TEXT,

    CONSTRAINT "coa_outcome_target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_output" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "program_id" UUID,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "rc_id" UUID,
    "parent_id" UUID,
    "description" VARCHAR(500),
    "outcome_id" UUID,
    "sub_program_id" UUID,
    "comments" TEXT,

    CONSTRAINT "budg_output_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_program_objective" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "program_id" UUID,
    "budget_sheet_id" UUID,
    "fiscal_year_id" UUID NOT NULL,
    "rc_id" UUID,
    "parent_id" UUID,
    "description" VARCHAR(500),
    "comments" TEXT,

    CONSTRAINT "budg_program_objective_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_rc_budget_ceiling" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "budget_m3" DECIMAL NOT NULL,
    "budget_m2" DECIMAL NOT NULL,
    "budget_m1" DECIMAL NOT NULL,
    "budget" DECIMAL NOT NULL,
    "proj_out_turn" DECIMAL NOT NULL,
    "budget_p1" DECIMAL NOT NULL,
    "budget_p2" DECIMAL NOT NULL,
    "budget_p3" DECIMAL NOT NULL,
    "budget_sheet_id" UUID NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "prel_out_turn" DECIMAL NOT NULL DEFAULT 0,
    "mid_year" DECIMAL NOT NULL DEFAULT 0,
    "rc_id" UUID NOT NULL,
    "economic_id" UUID,
    "currency_id" UUID NOT NULL,
    "ceiling_amount" DECIMAL NOT NULL,
    "local_amount" DECIMAL NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "head_id" UUID,
    "comments" TEXT,
    "ceiling_category_type" VARCHAR(100),
    "funder_id" UUID,

    CONSTRAINT "budg_rc_budget_ceiling_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_strategy_intervention" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "strategy_id" UUID,
    "comments" TEXT,

    CONSTRAINT "coa_strategy_intervention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_supplementary_budget" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "amount" DECIMAL(19,2) NOT NULL,
    "creation_date" DATE NOT NULL,
    "reason" VARCHAR(500) NOT NULL,
    "status" VARCHAR(9) NOT NULL,
    "supplementary_budget_number" VARCHAR(20) NOT NULL,
    "budget_record_id" UUID NOT NULL,
    "cost_center_id" UUID NOT NULL,
    "fiscal_year_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "supplementary_budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_supplementary_budget_status" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "comments" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL,
    "status_date" TIMESTAMP(6) NOT NULL,
    "principal_id" UUID NOT NULL,
    "supplementary_budget_id" UUID,

    CONSTRAINT "supplementary_budget_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."budg_vehicle_plant_rule" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "rule" VARCHAR(250) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,
    "fiscal_year_id" UUID
);

-- CreateTable
CREATE TABLE "public"."coa_administrative" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "full_code" VARCHAR(12) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "level" INTEGER NOT NULL,
    "parent_id" UUID,
    "function_id" UUID,
    "location_id" UUID,
    "program_id" UUID,
    "comments" TEXT,
    "economic_id" UUID,
    "agency_category" VARCHAR(10),
    "objective" VARCHAR(500),

    CONSTRAINT "coa_administrative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_administrative_funding" (
    "id" UUID NOT NULL,
    "administrative_id" UUID NOT NULL,
    "funder_id" UUID NOT NULL,
    "comments" TEXT,
    "state" INTEGER NOT NULL DEFAULT 0,
    "version" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "coa_administrative_funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_administrative_program" (
    "id" UUID NOT NULL,
    "administrative_id" UUID NOT NULL,
    "program_id" UUID NOT NULL,
    "specific_objective" TEXT,
    "comments" TEXT,
    "state" INTEGER NOT NULL DEFAULT 0,
    "version" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "coa_administrative_program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_economic" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "full_code" VARCHAR(12) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "level" INTEGER NOT NULL,
    "parent_id" UUID,
    "transaction_type" VARCHAR(20),
    "comments" TEXT,
    "old_code" VARCHAR(12),
    "account_sens" VARCHAR(20),
    "account_balance_behaviour" VARCHAR(30),

    CONSTRAINT "coa_economic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_function" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "full_code" VARCHAR(12) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "level" INTEGER NOT NULL,
    "parent_id" UUID,
    "comments" TEXT,

    CONSTRAINT "coa_function_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_fund" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "full_code" VARCHAR(12) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "level" INTEGER NOT NULL,
    "parent_id" UUID,
    "comments" TEXT,

    CONSTRAINT "coa_fund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_location" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "full_code" VARCHAR(12) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "level" INTEGER NOT NULL,
    "parent_id" UUID,
    "comments" TEXT,

    CONSTRAINT "coa_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_program" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "full_code" VARCHAR(12) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "level" INTEGER NOT NULL,
    "parent_id" UUID,
    "activity_type" VARCHAR(15),
    "specific_objective" TEXT,
    "comments" TEXT,
    "action_detail_id" UUID,
    "status" VARCHAR(255) NOT NULL DEFAULT 'PREPARED',
    "coordinator_id" UUID,
    "sectorial_outcome_id" UUID,
    "economic_sector" VARCHAR(1),
    "national" BOOLEAN,
    "input_category" VARCHAR(50),
    "administrative_id" UUID,
    "output_id" UUID,
    "implementation" BYTEA,
    "head_impl" DOUBLE PRECISION,
    "works_impl" DOUBLE PRECISION,
    "micro_impl" DOUBLE PRECISION,

    CONSTRAINT "coa_program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_program_economic" (
    "id" UUID NOT NULL,
    "program_id" UUID NOT NULL,
    "economic_id" UUID NOT NULL,
    "comments" TEXT,
    "state" INTEGER NOT NULL DEFAULT 1,
    "version" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "coa_program_economic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coa_project_location" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "constituency_id" UUID NOT NULL,
    "share" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,
    "state" INTEGER NOT NULL DEFAULT 1,
    "version" BIGINT NOT NULL DEFAULT 0,
    "chief_dom_id" UUID,

    CONSTRAINT "coa_project_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_bank" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "description" VARCHAR(255),
    "name" VARCHAR(250) NOT NULL,
    "account_number_length" INTEGER,
    "swift_code" VARCHAR,
    "comments" TEXT,

    CONSTRAINT "config_bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_cash_account" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "account_number" VARCHAR(255) NOT NULL,
    "account_name" VARCHAR(255) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "config_cash_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_contract" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "amount" DECIMAL(19,2) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "end_date" DATE NOT NULL,
    "reference_number" VARCHAR(30),
    "start_date" DATE NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "supplier_id" UUID NOT NULL,
    "amount_due" DECIMAL(19,2),
    "comments" TEXT,

    CONSTRAINT "config_contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_currency" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "description" VARCHAR(255),
    "name" VARCHAR(250) NOT NULL,
    "decimal_places" INTEGER NOT NULL,
    "comments" TEXT,

    CONSTRAINT "config_currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_currency_rate" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "buying_rate" DECIMAL(19,2) NOT NULL,
    "middle_rate" DECIMAL(19,2) NOT NULL,
    "rate_date" DATE NOT NULL,
    "selling_rate" DECIMAL(19,2) NOT NULL,
    "currency_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "config_currency_rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_group_header" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "type" VARCHAR(100),
    "comments" TEXT,
    "parent_id" UUID,

    CONSTRAINT "config_group_header_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_measurement_unit" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "description" VARCHAR(255),
    "name" VARCHAR(250) NOT NULL,
    "measurement_type" VARCHAR(255) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "config_measurement_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_period" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "type" VARCHAR(40) NOT NULL,
    "end_date" DATE NOT NULL,
    "start_date" DATE NOT NULL,
    "parent_id" UUID,
    "accounting_open" BOOLEAN NOT NULL,
    "planning_budget_open" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "config_period_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_product_category" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "description" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "is_default" BOOLEAN,
    "measurement_unit" VARCHAR(50),
    "code" VARCHAR(2) NOT NULL DEFAULT '00',
    "comments" TEXT,

    CONSTRAINT "config_product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_supplier" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "description" VARCHAR(255),
    "detailed_address" VARCHAR(255),
    "email_address" VARCHAR(255),
    "name" VARCHAR(250) NOT NULL,
    "phone_number" VARCHAR(255),
    "supplier_type" VARCHAR(255) NOT NULL,
    "tin" VARCHAR(250),
    "comments" TEXT,

    CONSTRAINT "config_creditor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_supplier_bank_account" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "account_name" VARCHAR(255) NOT NULL,
    "account_number" VARCHAR(255) NOT NULL,
    "bank_id" UUID,
    "currency_id" UUID NOT NULL,
    "supplier_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "config_supplier_bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."document_type" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "content_type" VARCHAR(15) NOT NULL,
    "maximum_size" BIGINT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "document_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."flyway_schema_history" (
    "installed_rank" INTEGER NOT NULL,
    "version" VARCHAR(50),
    "description" VARCHAR(200) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "script" VARCHAR(1000) NOT NULL,
    "checksum" INTEGER,
    "installed_by" VARCHAR(100) NOT NULL,
    "installed_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_time" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "flyway_schema_history_pk" PRIMARY KEY ("installed_rank")
);

-- CreateTable
CREATE TABLE "public"."history_bo" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "approval_date" TIMESTAMP(6),
    "preparation_date" TIMESTAMP(6) NOT NULL,
    "review_date" TIMESTAMP(6),
    "verification_date" TIMESTAMP(6),
    "approver_id" UUID,
    "preparer_id" UUID NOT NULL,
    "reviewer_id" UUID,
    "verifier_id" UUID,
    "comments" TEXT,

    CONSTRAINT "history_bo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hr_employee" (
    "id" UUID NOT NULL,
    "identification_no" VARCHAR(20),
    "employee_no" VARCHAR(20) NOT NULL,
    "employee_names" VARCHAR(250),
    "employment_type" VARCHAR(20),
    "gender" VARCHAR(10),
    "head_id" UUID,
    "rc_id" UUID,
    "post_number_id" UUID,
    "grade_notch_id" UUID,
    "comments" TEXT,
    "total_allowances" DECIMAL(20,0) NOT NULL DEFAULT 0,
    "personnel_category" VARCHAR(50),
    "stop_date" DATE,

    CONSTRAINT "hr_employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hr_employee_salary" (
    "id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "period_id" UUID NOT NULL,
    "component_id" UUID NOT NULL,
    "salary_type" VARCHAR(20) NOT NULL,
    "amount" DECIMAL(20,0) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "hr_employee_salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hr_grade" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "comments" TEXT,
    "description" VARCHAR(255),
    "grid_code" VARCHAR(50),
    "top_notch" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "hr_grade_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hr_grade_notch" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "grade_id" UUID NOT NULL,
    "notch" INTEGER NOT NULL,
    "annual_salary" DECIMAL(20,0) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "hr_grade_notch_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hr_post" (
    "id" UUID NOT NULL,
    "state" INTEGER,
    "version" BIGINT,
    "code" VARCHAR(50),
    "name" VARCHAR(250),
    "description" VARCHAR(250),
    "comments" TEXT,
    "grade_id" UUID,
    "amount" DECIMAL,

    CONSTRAINT "hr_post_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hr_post_number" (
    "id" UUID NOT NULL,
    "post_no" VARCHAR(50) NOT NULL,
    "head_id" UUID NOT NULL,
    "rc_id" UUID,
    "post_id" UUID,
    "comments" TEXT,
    "post_indicator" VARCHAR(50),
    "post_status" VARCHAR(50),

    CONSTRAINT "hr_post_number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hr_salary_component" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(250),
    "salary_type" VARCHAR(20) NOT NULL,
    "increment_type" VARCHAR(20) NOT NULL,
    "economic_id" UUID NOT NULL,
    "comments" TEXT,
    "employment_type" VARCHAR(20),

    CONSTRAINT "hr_salary_component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message_category" (
    "id" INTEGER NOT NULL,
    "code" VARCHAR(255),
    "name" VARCHAR(255),
    "comments" TEXT,

    CONSTRAINT "message_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message_type" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "message_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."opr_operational_report" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "context" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "exportable" BOOLEAN NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "orientation" VARCHAR(255) NOT NULL,
    "printable" BOOLEAN NOT NULL,
    "comments" VARCHAR,

    CONSTRAINT "opr_operational_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."opr_report_column" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "aggregate_function" VARCHAR(255),
    "background_color" VARCHAR(255) NOT NULL,
    "column_description" VARCHAR(255) NOT NULL,
    "column_name" VARCHAR(255) NOT NULL,
    "font_style" VARCHAR(255) NOT NULL,
    "fore_color" VARCHAR(255) NOT NULL,
    "position" INTEGER NOT NULL,
    "report_id" UUID NOT NULL,
    "summary" BOOLEAN NOT NULL,
    "width" REAL NOT NULL,
    "summary_description" VARCHAR,
    "comments" VARCHAR,

    CONSTRAINT "opr_report_column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."opr_report_filter" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "column_name" VARCHAR(255) NOT NULL,
    "operator" VARCHAR(255) NOT NULL,
    "report_id" UUID NOT NULL,
    "comments" VARCHAR,

    CONSTRAINT "opr_report_filter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reference_document" (
    "filename" VARCHAR(255) NOT NULL,
    "basename" VARCHAR(255),
    "creationdate" TIMESTAMP(6),
    "creatorname" VARCHAR(255),
    "extension" VARCHAR(255),
    "filecontent" BYTEA,
    "comments" TEXT,

    CONSTRAINT "referencedocument_pkey" PRIMARY KEY ("filename")
);

-- CreateTable
CREATE TABLE "public"."rpt_domain_report_component" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "report_component_id" UUID NOT NULL,
    "domain_component_id" UUID NOT NULL,
    "comments" TEXT,
    "state" INTEGER NOT NULL DEFAULT 0,
    "version" BIGINT NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "public"."rpt_report_component" (
    "id" UUID NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(80) NOT NULL,

    CONSTRAINT "rpt_report_component_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_menu_item" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "description" VARCHAR(255),
    "level" VARCHAR(1) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "parent_id" UUID,
    "code" VARCHAR(100),
    "comments" TEXT,

    CONSTRAINT "sec_menu_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_notification" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "body" TEXT,
    "receiver" VARCHAR(500),
    "creation_date" TIMESTAMP(6) NOT NULL,
    "size" VARCHAR(50) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "sender" VARCHAR(100),
    "type" VARCHAR(255) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_notification_recipient" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "notification_id" UUID NOT NULL,
    "sender_id" UUID NOT NULL,
    "receiver_id" UUID NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "notification_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_permission" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "alias_name" VARCHAR(250) NOT NULL,
    "description" VARCHAR(255),
    "name" VARCHAR(250) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sec_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_role" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "description" VARCHAR(255),
    "name" VARCHAR(250) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sec_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_role_action" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "action_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sec_role_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_role_menu" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "menu_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sec_role_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_role_permission" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "permission_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sec_role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_system_user_rc" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "rc_id" UUID NOT NULL,
    "system_user_id" UUID NOT NULL,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6),
    "role_id" UUID,
    "comments" TEXT,

    CONSTRAINT "sec_system_user_rc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_system_user_role" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "role_id" UUID NOT NULL,
    "system_user_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sec_system_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_user_action" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "description" VARCHAR(255),
    "name" VARCHAR(50) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sec_user_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sec_user_preference" (
    "id" UUID NOT NULL,
    "object_type" VARCHAR(255) NOT NULL,
    "object_value" VARCHAR(255) NOT NULL,
    "system_user_id" UUID NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sec_user_preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sequence_number" (
    "id" UUID NOT NULL,
    "sequence" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "sequence_number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."temp_grade" (
    "id" UUID NOT NULL,
    "state" INTEGER NOT NULL,
    "version" BIGINT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "comments" TEXT,
    "description" VARCHAR(255),
    "grid_code" VARCHAR(50),
    "top_notch" INTEGER NOT NULL DEFAULT 5
);

-- CreateTable
CREATE TABLE "public"."user_message" (
    "id" INTEGER NOT NULL,
    "local" BIGINT NOT NULL,
    "value" VARCHAR(255),
    "category" INTEGER NOT NULL,
    "type" INTEGER,
    "comments" TEXT,

    CONSTRAINT "user_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wf_action" (
    "id" UUID NOT NULL,
    "created_date" TIMESTAMP(6),
    "state" INTEGER NOT NULL,
    "updated_date" TIMESTAMP(6),
    "version" BIGINT NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "wf_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wf_action_comment" (
    "id" UUID NOT NULL,
    "created_date" TIMESTAMP(6),
    "state" INTEGER NOT NULL,
    "updated_date" TIMESTAMP(6),
    "version" BIGINT NOT NULL,
    "comment" TEXT NOT NULL,
    "reference_id" VARCHAR(255) NOT NULL,
    "action_detail_id" UUID NOT NULL,
    "comments" TEXT,
    "user_id" VARCHAR(100),
    "action_time" TIMESTAMP(6),

    CONSTRAINT "wf_action_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wf_action_detail" (
    "id" UUID NOT NULL,
    "created_date" TIMESTAMP(6),
    "state" INTEGER NOT NULL,
    "updated_date" TIMESTAMP(6),
    "version" BIGINT NOT NULL,
    "accounting_sens" VARCHAR(255),
    "act_as_cancel" BOOLEAN NOT NULL,
    "act_as_reject" BOOLEAN NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "gl_integration" BOOLEAN NOT NULL,
    "icon" VARCHAR(255),
    "isdefaultone" BOOLEAN,
    "is_final" BOOLEAN,
    "level" INTEGER NOT NULL,
    "message_required" BOOLEAN NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "require_editor" BOOLEAN NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "action" UUID NOT NULL,
    "parent_id" UUID,
    "user_action_id" UUID,
    "comments" TEXT,
    "next_action_detail_id" UUID,
    "role_ids" TEXT,

    CONSTRAINT "wf_action_detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ana_data_attribute_uk1" ON "public"."ana_data_attribute"("attribute_name", "context");

-- CreateIndex
CREATE UNIQUE INDEX "ast_equipment_owner_uk1" ON "public"."ast_equipment_owner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ast_fuel_type_uk1" ON "public"."ast_fuel_type"("fiscal_year_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ast_transport_brand_uk2" ON "public"."ast_transport_brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ast_transport_dealer_uk1" ON "public"."ast_transport_dealer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ast_transport_equipment_uk_01" ON "public"."ast_transport_equipment"("asset_number");

-- CreateIndex
CREATE UNIQUE INDEX "ast_transport_equipment_uk_02" ON "public"."ast_transport_equipment"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "hr_vehicle_budget_component_uk1" ON "public"."ast_vehicle_budget_component"("code");

-- CreateIndex
CREATE UNIQUE INDEX "hr_vehicle_budget_component_uk2" ON "public"."ast_vehicle_budget_component"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ast_vehicle_type_uk1" ON "public"."ast_vehicle_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "budg_activity_uk_1" ON "public"."budg_activity"("code");

-- CreateIndex
CREATE INDEX "budg_administrative_budget_ceiling_index_1" ON "public"."budg_administrative_budget_ceiling"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_administrative_budget_ceiling_uk_1" ON "public"."budg_administrative_budget_ceiling"("budget_sheet_id", "administrative_id", "ceiling_category_type");

-- CreateIndex
CREATE UNIQUE INDEX "budg_assumption_uk_1" ON "public"."budg_assumption"("reference_number");

-- CreateIndex
CREATE INDEX "budg_assumption_index_1" ON "public"."budg_assumption"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_bfp_currency_rate_uk_1" ON "public"."budg_bfp_currency_rate"("currency_id", "fiscal_year_id");

-- CreateIndex
CREATE INDEX "budg_budget_brief_index_1" ON "public"."budg_budget_brief"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_budget_brief_uk_1" ON "public"."budg_budget_brief"("budget_sheet_id", "fiscal_year_id", "administrative_id");

-- CreateIndex
CREATE INDEX "budg_budget_ceiling_item_index_1" ON "public"."budg_budget_ceiling_item"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_budget_ceiling_item_uk_1" ON "public"."budg_budget_ceiling_item"("budget_sheet_id", "budget_ceiling_id", "category_id");

-- CreateIndex
CREATE INDEX "budg_budget_input_index_1" ON "public"."budg_budget_input"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_budget_input_uk1" ON "public"."budg_budget_input"("fiscal_year_id", "responsibility_center_id", "economic_detail_id", "program_id", "funder_id");

-- CreateIndex
CREATE UNIQUE INDEX "budget_reallocation_uk_1" ON "public"."budg_budget_reallocation"("reallocation_number");

-- CreateIndex
CREATE UNIQUE INDEX "budg_budget_release_uk_1" ON "public"."budg_budget_release"("reference_number");

-- CreateIndex
CREATE INDEX "budg_budget_release_idx_1" ON "public"."budg_budget_release"("fiscal_year_id");

-- CreateIndex
CREATE INDEX "budg_budget_release_idx_2" ON "public"."budg_budget_release"("rc_id");

-- CreateIndex
CREATE INDEX "budg_budget_release_idx_3" ON "public"."budg_budget_release"("commitment_plan_id");

-- CreateIndex
CREATE INDEX "budg_budget_release_idx_4" ON "public"."budg_budget_release"("budget_sheet_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_budget_release_detail_uk_1" ON "public"."budg_budget_release_detail"("economic_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_budget_sheet_uk_1" ON "public"."budg_budget_sheet"("reference_number");

-- CreateIndex
CREATE INDEX "budg_budget_sheet_index_1" ON "public"."budg_budget_sheet"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_ceiling_category_uk_1" ON "public"."budg_ceiling_category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "budg_ceiling_category_economic_uk1" ON "public"."budg_ceiling_category_economic"("category_id", "economic_id", "mtef_component");

-- CreateIndex
CREATE INDEX "budg_commitment_plan_idx_1" ON "public"."budg_commitment_plan"("fiscal_year_id");

-- CreateIndex
CREATE INDEX "budg_commitment_plan_idx_2" ON "public"."budg_commitment_plan"("rc_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_commitment_plan_ceiling_uk_1" ON "public"."budg_commitment_plan_ceiling"("reference_number");

-- CreateIndex
CREATE INDEX "budg_commitment_plan_ceiling_idx_1" ON "public"."budg_commitment_plan_ceiling"("fiscal_year_id");

-- CreateIndex
CREATE INDEX "budg_commitment_plan_ceiling_idx_2" ON "public"."budg_commitment_plan_ceiling"("rc_id");

-- CreateIndex
CREATE INDEX "budg_gdp_data_index_1" ON "public"."budg_gdp_data"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_gdp_data_uk_1" ON "public"."budg_gdp_data"("budget_sheet_id", "reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "budg_gdp_parameter_uk_1" ON "public"."budg_gdp_parameter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "budg_gdp_template_uk_2" ON "public"."budg_gdp_template"("name");

-- CreateIndex
CREATE UNIQUE INDEX "budg_gdp_template_uk_1" ON "public"."budg_gdp_template"("reference_number");

-- CreateIndex
CREATE INDEX "budg_budget_ceiling_index_1" ON "public"."budg_head_budget_ceiling"("fiscal_year_id");

-- CreateIndex
CREATE INDEX "budg_rc_budget_ceiling_index_1" ON "public"."budg_head_budget_ceiling"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_budget_ceiling_uk_1" ON "public"."budg_head_budget_ceiling"("budget_sheet_id", "head_id", "ceiling_category_type");

-- CreateIndex
CREATE UNIQUE INDEX "budg_key_achievement_uk_1" ON "public"."budg_key_achievement"("reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "budg_key_challenge_uk_1" ON "public"."budg_key_challenge"("reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "coa_key_issue_uk_1" ON "public"."budg_key_issue"("outcome_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "budg_key_performance_indicator_uk_1" ON "public"."budg_key_performance_indicator"("responsibility_center_id", "fiscal_year_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "budg_mt_policy_objective_uk_1" ON "public"."budg_mt_policy_objective"("reference_number");

-- CreateIndex
CREATE INDEX "budg_mt_policy_objective_index_1" ON "public"."budg_mt_policy_objective"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_mtff_economic_uk_1" ON "public"."budg_mtff_economic"("economic_id");

-- CreateIndex
CREATE INDEX "budg_mtff_item_index_1" ON "public"."budg_mtff_item"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_mtff_item_uk_1" ON "public"."budg_mtff_item"("budget_sheet_id", "economic_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_mtff_parameter_uk_1" ON "public"."budg_mtff_parameter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "budg_mtff_template_uk_1" ON "public"."budg_mtff_template"("reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "budg_national_development_plan_uk_1" ON "public"."budg_national_development_plan"("code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_outcome_uk_1" ON "public"."budg_outcome"("parent_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_outcome_strategy_uk_1" ON "public"."budg_outcome_strategy"("outcome_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_outcome_target_uk_1" ON "public"."budg_outcome_target"("outcome_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "budg_output_uk_1" ON "public"."budg_output"("code");

-- CreateIndex
CREATE UNIQUE INDEX "budg_program_objective_uk_1" ON "public"."budg_program_objective"("code");

-- CreateIndex
CREATE INDEX "budg_program_objective_index_1" ON "public"."budg_program_objective"("fiscal_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "budg_rc_budget_ceiling_uk_1" ON "public"."budg_rc_budget_ceiling"("budget_sheet_id", "rc_id", "economic_id");

-- CreateIndex
CREATE UNIQUE INDEX "coa_strategy_intervention_uk_1" ON "public"."budg_strategy_intervention"("strategy_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_strategy_intervention_uk_2" ON "public"."budg_strategy_intervention"("strategy_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "budg_supplementary_budget_uk_1" ON "public"."budg_supplementary_budget"("supplementary_budget_number");

-- CreateIndex
CREATE UNIQUE INDEX "budg_vehicle_plant_rule_uk1" ON "public"."budg_vehicle_plant_rule"("fiscal_year_id", "rule");

-- CreateIndex
CREATE UNIQUE INDEX "coa_administrative_uk_1" ON "public"."coa_administrative"("parent_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_administrative_funding_uk1" ON "public"."coa_administrative_funding"("administrative_id", "funder_id");

-- CreateIndex
CREATE UNIQUE INDEX "coa_administrative_program_uk1" ON "public"."coa_administrative_program"("administrative_id", "program_id");

-- CreateIndex
CREATE UNIQUE INDEX "coa_economic_uk_1" ON "public"."coa_economic"("parent_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_function_uk_1" ON "public"."coa_function"("parent_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_fund_uk_1" ON "public"."coa_fund"("parent_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_location_uk_1" ON "public"."coa_location"("parent_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_program_uk_2" ON "public"."coa_program"("full_code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_program_uk_1" ON "public"."coa_program"("parent_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "coa_program_uk_3" ON "public"."coa_program"("parent_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "coa_program_economic_uk1" ON "public"."coa_program_economic"("program_id", "economic_id");

-- CreateIndex
CREATE UNIQUE INDEX "coa_project_location_uk1" ON "public"."coa_project_location"("project_id", "constituency_id", "chief_dom_id");

-- CreateIndex
CREATE UNIQUE INDEX "config_bank_uk1" ON "public"."config_bank"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ukrxel0pbg7bh7sprjcxw7k7d0i" ON "public"."config_cash_account"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "currency_uk1" ON "public"."config_currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "config_currency_rate_uk1" ON "public"."config_currency_rate"("rate_date", "currency_id");

-- CreateIndex
CREATE UNIQUE INDEX "config_group_header_uk_1" ON "public"."config_group_header"("parent_id", "type", "code");

-- CreateIndex
CREATE UNIQUE INDEX "config_measurement_unit_uk2" ON "public"."config_measurement_unit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "config_measurement_unit_uk1" ON "public"."config_measurement_unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uk_config_period_name" ON "public"."config_period"("name");

-- CreateIndex
CREATE INDEX "config_period_index_1" ON "public"."config_period"("parent_id");

-- CreateIndex
CREATE INDEX "config_period_index_2" ON "public"."config_period"("end_date");

-- CreateIndex
CREATE UNIQUE INDEX "config_product_category_uk1" ON "public"."config_product_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ukeggux0ipjj7ljekppdrtmhu02" ON "public"."config_supplier_bank_account"("account_number", "bank_id");

-- CreateIndex
CREATE UNIQUE INDEX "document_type_uk1" ON "public"."document_type"("name");

-- CreateIndex
CREATE INDEX "flyway_schema_history_s_idx" ON "public"."flyway_schema_history"("success");

-- CreateIndex
CREATE UNIQUE INDEX "hr_employee_salary_uk1" ON "public"."hr_employee_salary"("employee_id", "component_id");

-- CreateIndex
CREATE UNIQUE INDEX "hr_grade_notch_uk1" ON "public"."hr_grade_notch"("grade_id", "notch");

-- CreateIndex
CREATE UNIQUE INDEX "hr_salary_component_uk1" ON "public"."hr_salary_component"("code");

-- CreateIndex
CREATE UNIQUE INDEX "hr_salary_component_uk2" ON "public"."hr_salary_component"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rpt_report_component_economic_unique" ON "public"."rpt_domain_report_component"("report_component_id", "domain_component_id");

-- CreateIndex
CREATE UNIQUE INDEX "rpt_report_component_code_unique" ON "public"."rpt_report_component"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sec_menu_item_uk1" ON "public"."sec_menu_item"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sec_menu_item_uk2" ON "public"."sec_menu_item"("level", "name");

-- CreateIndex
CREATE UNIQUE INDEX "uk820njc06hnbad2iocijr5qla4" ON "public"."sec_permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uk5310es9i5y5r51t7m0yo9qmg4" ON "public"."sec_role"("code", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ukqfdtd7st2ewak7kqntgaeomyf" ON "public"."sec_role_action"("role_id", "action_id");

-- CreateIndex
CREATE UNIQUE INDEX "ukenij886lsai0pns7fgg5vlkyi" ON "public"."sec_role_menu"("role_id", "menu_id");

-- CreateIndex
CREATE UNIQUE INDEX "ukea4cysdh3ecv394w7e4mpsgsw" ON "public"."sec_role_permission"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "sec_system_user_rc_uk_1" ON "public"."sec_system_user_rc"("system_user_id", "rc_id");

-- CreateIndex
CREATE UNIQUE INDEX "ukd3nwv9t40eplymso28g0smeuc" ON "public"."sec_system_user_role"("system_user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "uko4rodg5lqy29je2cchu2typmh" ON "public"."sec_user_action"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uk92690hmkk851vyfmujls018dl" ON "public"."sec_user_preference"("object_type", "system_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "uk8n96lev6hv8j9jodpiulescnj" ON "public"."sequence_number"("type");

-- CreateIndex
CREATE UNIQUE INDEX "uk_i0xrhabw9cqhojqbuak4x17jj" ON "public"."user_message"("value");

-- CreateIndex
CREATE UNIQUE INDEX "wf_action_uk1" ON "public"."wf_action"("code");

-- CreateIndex
CREATE UNIQUE INDEX "wf_action_uk2" ON "public"."wf_action"("name");

-- AddForeignKey
ALTER TABLE "public"."ast_fuel_type" ADD CONSTRAINT "ast_fuel_type_fk1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_transport_equipment" ADD CONSTRAINT "ast_transport_equipment_fk_1" FOREIGN KEY ("dealer_id") REFERENCES "public"."ast_transport_dealer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_transport_equipment" ADD CONSTRAINT "ast_transport_equipment_fk_2" FOREIGN KEY ("owner_id") REFERENCES "public"."ast_equipment_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_transport_equipment" ADD CONSTRAINT "ast_transport_equipment_fk_3" FOREIGN KEY ("controlling_cost_center_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_transport_equipment" ADD CONSTRAINT "ast_transport_equipment_fk_4" FOREIGN KEY ("fuel_type_id") REFERENCES "public"."ast_fuel_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_transport_equipment" ADD CONSTRAINT "ast_transport_equipment_fk_5" FOREIGN KEY ("brand_id") REFERENCES "public"."ast_transport_brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_transport_equipment" ADD CONSTRAINT "ast_transport_equipment_fk_6" FOREIGN KEY ("vehicle_type_id") REFERENCES "public"."ast_vehicle_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_transport_equipment" ADD CONSTRAINT "ast_transport_equipment_fk_8" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_vehicle_budget_component" ADD CONSTRAINT "ast_vehicle_budget_component_fk1" FOREIGN KEY ("economic_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ast_vehicle_budget_component" ADD CONSTRAINT "ast_vehicle_budget_component_fk2" FOREIGN KEY ("responsible_rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_activity" ADD CONSTRAINT "budg_activity_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_activity" ADD CONSTRAINT "budg_activity_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_activity" ADD CONSTRAINT "budg_activity_fk_3" FOREIGN KEY ("program_id") REFERENCES "public"."coa_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_activity" ADD CONSTRAINT "budg_activity_fk_5" FOREIGN KEY ("rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_administrative_budget_ceiling" ADD CONSTRAINT "budg_administrative_budget_ceiling_budg_budget_sheet_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_administrative_budget_ceiling" ADD CONSTRAINT "budg_administrative_budget_ceiling_budg_budget_sheet_fk_2" FOREIGN KEY ("bc_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_administrative_budget_ceiling" ADD CONSTRAINT "budg_administrative_budget_ceiling_fk_3" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_administrative_budget_ceiling" ADD CONSTRAINT "budg_administrative_budget_ceiling_fk_4" FOREIGN KEY ("administrative_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_assumption" ADD CONSTRAINT "budg_assumption_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_assumption" ADD CONSTRAINT "budg_assumption_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_assumption" ADD CONSTRAINT "budg_assumption_fk_3" FOREIGN KEY ("header_id") REFERENCES "public"."config_group_header"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_bfp_currency_rate" ADD CONSTRAINT "budg_bfp_currency_rate_fk_1" FOREIGN KEY ("currency_id") REFERENCES "public"."config_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_bfp_currency_rate" ADD CONSTRAINT "budg_bfp_currency_rate_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_brief" ADD CONSTRAINT "budg_budget_brief_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_brief" ADD CONSTRAINT "budg_budget_brief_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_call_circular" ADD CONSTRAINT "budg_bcc_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_call_circular" ADD CONSTRAINT "budg_bcc_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_call_circular" ADD CONSTRAINT "budg_budget_call_circular_fk_3" FOREIGN KEY ("action_detail_id") REFERENCES "public"."wf_action_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_ceiling_item" ADD CONSTRAINT "budg_budget_ceiling_item_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_ceiling_item" ADD CONSTRAINT "budg_budget_ceiling_item_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_ceiling_item" ADD CONSTRAINT "budg_budget_ceiling_item_fk_3" FOREIGN KEY ("budget_ceiling_id") REFERENCES "public"."budg_administrative_budget_ceiling"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_ceiling_item" ADD CONSTRAINT "budg_budget_ceiling_item_fk_4" FOREIGN KEY ("category_id") REFERENCES "public"."budg_ceiling_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_framework_paper" ADD CONSTRAINT "budg_budget_framework_paper_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_framework_paper" ADD CONSTRAINT "budg_budget_framework_paper_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_budg_activity_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."budg_activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_budg_budget_sheet_fk" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_budg_budget_sheet_fk_1" FOREIGN KEY ("parent_budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_budg_ceiling_category_fk" FOREIGN KEY ("ceiling_category_id") REFERENCES "public"."budg_ceiling_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_budg_output_fk" FOREIGN KEY ("output_id") REFERENCES "public"."budg_output"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_coa_administrative_fk" FOREIGN KEY ("responsibility_center_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_coa_administrative_fk_1" FOREIGN KEY ("head_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_coa_administrative_fk_2" FOREIGN KEY ("agency_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_coa_fund_fk" FOREIGN KEY ("funder_id") REFERENCES "public"."coa_fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_coa_program_fk" FOREIGN KEY ("program_id") REFERENCES "public"."coa_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_config_measurement_unit_fk" FOREIGN KEY ("measurement_unit_id") REFERENCES "public"."config_measurement_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_input" ADD CONSTRAINT "budg_budget_input_config_period_fk" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_reallocation" ADD CONSTRAINT "budget_reallocation_fk_1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_release" ADD CONSTRAINT "budg_budget_release_fk_1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_release" ADD CONSTRAINT "budg_budget_release_fk_2" FOREIGN KEY ("rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_release" ADD CONSTRAINT "budg_budget_release_fk_3" FOREIGN KEY ("action_detail_id") REFERENCES "public"."wf_action_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_release" ADD CONSTRAINT "budg_budget_release_fk_4" FOREIGN KEY ("commitment_plan_id") REFERENCES "public"."budg_commitment_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_release" ADD CONSTRAINT "budg_budget_release_fk_5" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_release_detail" ADD CONSTRAINT "budg_budget_release_detail_fk_1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_release_detail" ADD CONSTRAINT "budg_budget_release_detail_fk_2" FOREIGN KEY ("rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_release_detail" ADD CONSTRAINT "budg_budget_release_detail_fk_3" FOREIGN KEY ("budget_release_id") REFERENCES "public"."budg_budget_release"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_sheet" ADD CONSTRAINT "budg_budget_sheet_fk_1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_sheet" ADD CONSTRAINT "budg_budget_sheet_fk_2" FOREIGN KEY ("administrative_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_sheet" ADD CONSTRAINT "budg_budget_sheet_fk_3" FOREIGN KEY ("action_detail_id") REFERENCES "public"."wf_action_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_budget_sheet" ADD CONSTRAINT "budg_budget_sheet_fk_4" FOREIGN KEY ("parent_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_ceiling_category_economic" ADD CONSTRAINT "budg_ceiling_category_economic_fk_1" FOREIGN KEY ("category_id") REFERENCES "public"."budg_ceiling_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_ceiling_category_economic" ADD CONSTRAINT "budg_ceiling_category_economic_fk_2" FOREIGN KEY ("economic_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan" ADD CONSTRAINT "budg_commitment_plan_fk_1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan" ADD CONSTRAINT "budg_commitment_plan_fk_2" FOREIGN KEY ("rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan" ADD CONSTRAINT "budg_commitment_plan_fk_3" FOREIGN KEY ("action_detail_id") REFERENCES "public"."wf_action_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan" ADD CONSTRAINT "budg_commitment_plan_fk_5" FOREIGN KEY ("commitment_plan_ceiling_id") REFERENCES "public"."budg_commitment_plan_ceiling"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_ceiling" ADD CONSTRAINT "budg_commitment_plan_ceiling_fk_1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_ceiling" ADD CONSTRAINT "budg_commitment_plan_ceiling_fk_2" FOREIGN KEY ("rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_ceiling" ADD CONSTRAINT "budg_commitment_plan_ceiling_fk_3" FOREIGN KEY ("action_detail_id") REFERENCES "public"."wf_action_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_ceiling" ADD CONSTRAINT "budg_commitment_plan_ceiling_fk_4" FOREIGN KEY ("economic_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_ceiling" ADD CONSTRAINT "budg_commitment_plan_ceiling_fk_5" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_detail" ADD CONSTRAINT "budg_commitment_plan_detail_fk_1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_detail" ADD CONSTRAINT "budg_commitment_plan_detail_fk_2" FOREIGN KEY ("rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_detail" ADD CONSTRAINT "budg_commitment_plan_detail_fk_3" FOREIGN KEY ("economic_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_commitment_plan_detail" ADD CONSTRAINT "budg_commitment_plan_detail_fk_4" FOREIGN KEY ("commitment_plan_id") REFERENCES "public"."budg_commitment_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_fiscal_framework_paper" ADD CONSTRAINT "budg_ffp_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_fiscal_framework_paper" ADD CONSTRAINT "budg_ffp_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_forwarding_letter" ADD CONSTRAINT "budg_forwarding_letter_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_forwarding_letter" ADD CONSTRAINT "budg_forwarding_letter_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_gdp_data" ADD CONSTRAINT "budg_gdp_data_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_gdp_data" ADD CONSTRAINT "budg_gdp_data_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_gdp_file" ADD CONSTRAINT "budg_gdp_file_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_gdp_file" ADD CONSTRAINT "budg_gdp_file_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_head_budget_ceiling" ADD CONSTRAINT "budg_head_budget_ceiling_budg_budget_sheet_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_head_budget_ceiling" ADD CONSTRAINT "budg_head_budget_ceiling_budg_budget_sheet_fk_2" FOREIGN KEY ("bc_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_head_budget_ceiling" ADD CONSTRAINT "budg_head_budget_ceiling_fk_fy" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_key_achievement" ADD CONSTRAINT "budg_key_achievement_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_key_achievement" ADD CONSTRAINT "budg_key_achievement_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_key_challenge" ADD CONSTRAINT "budg_key_challenge_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_key_challenge" ADD CONSTRAINT "budg_key_challenge_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_key_issue" ADD CONSTRAINT "budg_key_issue_fk" FOREIGN KEY ("outcome_id") REFERENCES "public"."budg_outcome"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_key_performance_indicator" ADD CONSTRAINT "budg_key_performance_indicator_fk_1" FOREIGN KEY ("responsibility_center_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_key_performance_indicator" ADD CONSTRAINT "budg_key_performance_indicator_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_mt_policy_objective" ADD CONSTRAINT "budg_mt_policy_objective_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_mt_policy_objective" ADD CONSTRAINT "budg_mt_policy_objective_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_mtff_economic" ADD CONSTRAINT "budg_mtff_economic_coa_economic_fk_1" FOREIGN KEY ("economic_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_mtff_economic" ADD CONSTRAINT "budg_mtff_economic_fk_2" FOREIGN KEY ("mtff_template_id") REFERENCES "public"."budg_mtff_template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_mtff_item" ADD CONSTRAINT "budg_mtff_item_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_mtff_item" ADD CONSTRAINT "budg_mtff_item_fk_fy" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_outcome_strategy" ADD CONSTRAINT "budg_outcome_strategy_fk" FOREIGN KEY ("outcome_id") REFERENCES "public"."budg_outcome"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_outcome_target" ADD CONSTRAINT "budg_outcome_target_fk" FOREIGN KEY ("outcome_id") REFERENCES "public"."budg_outcome"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_output" ADD CONSTRAINT "budg_output_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_output" ADD CONSTRAINT "budg_output_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_output" ADD CONSTRAINT "budg_output_fk_3" FOREIGN KEY ("outcome_id") REFERENCES "public"."budg_outcome"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_program_objective" ADD CONSTRAINT "budg_program_objective_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_program_objective" ADD CONSTRAINT "budg_program_objective_fk_2" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_rc_budget_ceiling" ADD CONSTRAINT "budg_rc_budget_ceiling_budg_budget_sheet_fk_1" FOREIGN KEY ("budget_sheet_id") REFERENCES "public"."budg_budget_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_rc_budget_ceiling" ADD CONSTRAINT "budg_rc_budget_ceiling_fk_fy" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_supplementary_budget" ADD CONSTRAINT "budg_supplementary_budget_fk_1" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_supplementary_budget_status" ADD CONSTRAINT "budg_supplementary_budget_status_fk_1" FOREIGN KEY ("supplementary_budget_id") REFERENCES "public"."budg_supplementary_budget"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_supplementary_budget_status" ADD CONSTRAINT "budg_supplementary_budget_status_fk_2" FOREIGN KEY ("principal_id") REFERENCES "public"."sec_system_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."budg_vehicle_plant_rule" ADD CONSTRAINT "budg_vehicle_plant_rule_fk_fy" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_administrative" ADD CONSTRAINT "coa_administrative_fk2" FOREIGN KEY ("parent_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_administrative" ADD CONSTRAINT "coa_administrative_fk3" FOREIGN KEY ("location_id") REFERENCES "public"."coa_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_administrative" ADD CONSTRAINT "coa_administrative_fk4" FOREIGN KEY ("economic_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_administrative_funding" ADD CONSTRAINT "coa_administrative_funding_fk_1" FOREIGN KEY ("administrative_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_administrative_funding" ADD CONSTRAINT "coa_administrative_funding_fk_2" FOREIGN KEY ("funder_id") REFERENCES "public"."coa_fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_administrative_program" ADD CONSTRAINT "coa_administrative_program_fk_1" FOREIGN KEY ("administrative_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_administrative_program" ADD CONSTRAINT "coa_administrative_program_fk_2" FOREIGN KEY ("program_id") REFERENCES "public"."coa_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_economic" ADD CONSTRAINT "coa_economic_fk1" FOREIGN KEY ("parent_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_fund" ADD CONSTRAINT "coa_fund_fk1" FOREIGN KEY ("parent_id") REFERENCES "public"."coa_fund"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_location" ADD CONSTRAINT "coa_location_coa_location_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."coa_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_program_economic" ADD CONSTRAINT "coa_program_economic_fk_1" FOREIGN KEY ("program_id") REFERENCES "public"."coa_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_program_economic" ADD CONSTRAINT "coa_program_economic_fk_2" FOREIGN KEY ("economic_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_project_location" ADD CONSTRAINT "coa_project_location_fk_1" FOREIGN KEY ("project_id") REFERENCES "public"."coa_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."coa_project_location" ADD CONSTRAINT "coa_project_location_fk_2" FOREIGN KEY ("constituency_id") REFERENCES "public"."coa_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."config_contract" ADD CONSTRAINT "config_contract_fk1" FOREIGN KEY ("supplier_id") REFERENCES "public"."config_supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."config_currency_rate" ADD CONSTRAINT "config_currency_rate_fk1" FOREIGN KEY ("currency_id") REFERENCES "public"."config_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."config_period" ADD CONSTRAINT "config_period_fk_01" FOREIGN KEY ("parent_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."config_supplier_bank_account" ADD CONSTRAINT "fk38s8r98wefg7xqkk9rcna059u" FOREIGN KEY ("bank_id") REFERENCES "public"."config_bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."config_supplier_bank_account" ADD CONSTRAINT "fk4ahnqgv576mx2f0rdx0gl7qnb" FOREIGN KEY ("supplier_id") REFERENCES "public"."config_supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."config_supplier_bank_account" ADD CONSTRAINT "fkdhfsi8me42iypfmlasjd0ltjf" FOREIGN KEY ("currency_id") REFERENCES "public"."config_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_employee" ADD CONSTRAINT "hr_employee_fk1" FOREIGN KEY ("head_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_employee" ADD CONSTRAINT "hr_employee_fk2" FOREIGN KEY ("rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_employee" ADD CONSTRAINT "hr_employee_fk4" FOREIGN KEY ("grade_notch_id") REFERENCES "public"."hr_grade_notch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_employee_salary" ADD CONSTRAINT "hr_employee_salary_fk1" FOREIGN KEY ("employee_id") REFERENCES "public"."hr_employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_employee_salary" ADD CONSTRAINT "hr_employee_salary_fk2" FOREIGN KEY ("period_id") REFERENCES "public"."config_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_employee_salary" ADD CONSTRAINT "hr_employee_salary_fk3" FOREIGN KEY ("component_id") REFERENCES "public"."hr_salary_component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_post" ADD CONSTRAINT "hr_post_fk1" FOREIGN KEY ("grade_id") REFERENCES "public"."hr_grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_post_number" ADD CONSTRAINT "hr_post_number_fk1" FOREIGN KEY ("head_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_post_number" ADD CONSTRAINT "hr_post_number_fk2" FOREIGN KEY ("rc_id") REFERENCES "public"."coa_administrative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hr_salary_component" ADD CONSTRAINT "hr_salary_component_fk1" FOREIGN KEY ("economic_id") REFERENCES "public"."coa_economic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."rpt_domain_report_component" ADD CONSTRAINT "rpt_report_component_fk" FOREIGN KEY ("report_component_id") REFERENCES "public"."rpt_report_component"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_menu_item" ADD CONSTRAINT "fk7cq46mpp932l39x8op60o8yuv" FOREIGN KEY ("parent_id") REFERENCES "public"."sec_menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_notification_recipient" ADD CONSTRAINT "fk63hckqncmt4h9iea0092uao9b" FOREIGN KEY ("notification_id") REFERENCES "public"."sec_notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_notification_recipient" ADD CONSTRAINT "fkcfxdkja5qlc5n0wjdvpwa9cnq" FOREIGN KEY ("sender_id") REFERENCES "public"."sec_system_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_notification_recipient" ADD CONSTRAINT "fkg8bx420gvk2l2s07iexmabfoo" FOREIGN KEY ("receiver_id") REFERENCES "public"."sec_system_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_role_action" ADD CONSTRAINT "fkd57jimqko2s5ei1e17b4f5klb" FOREIGN KEY ("role_id") REFERENCES "public"."sec_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_role_action" ADD CONSTRAINT "fkgwodgqcr0g5de2avh5lfs898k" FOREIGN KEY ("action_id") REFERENCES "public"."sec_user_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_role_menu" ADD CONSTRAINT "fkiyi0lesdyiqil3k4usb0tbes8" FOREIGN KEY ("role_id") REFERENCES "public"."sec_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_role_menu" ADD CONSTRAINT "fkk30t9292gw3ff960aes0wkl4l" FOREIGN KEY ("menu_id") REFERENCES "public"."sec_menu_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_role_permission" ADD CONSTRAINT "fk3mv6m2regrdngqf9lg6jxmx1w" FOREIGN KEY ("permission_id") REFERENCES "public"."sec_permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_role_permission" ADD CONSTRAINT "fkrt2j9buagqns3tums3igtau2o" FOREIGN KEY ("role_id") REFERENCES "public"."sec_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_system_user_rc" ADD CONSTRAINT "sec_system_user_rc_fk_2" FOREIGN KEY ("system_user_id") REFERENCES "public"."sec_system_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_system_user_role" ADD CONSTRAINT "fkhi1h6m4v7sgmab4fjye0y2xw3" FOREIGN KEY ("role_id") REFERENCES "public"."sec_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_system_user_role" ADD CONSTRAINT "fkifjfoy2p78ibef2l6ysm2vv51" FOREIGN KEY ("system_user_id") REFERENCES "public"."sec_system_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."sec_user_preference" ADD CONSTRAINT "fkopgwoschyo3sjgj7l5calo48c" FOREIGN KEY ("system_user_id") REFERENCES "public"."sec_system_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_message" ADD CONSTRAINT "fk321f4fotucr6hll59q2mfghx7" FOREIGN KEY ("category") REFERENCES "public"."message_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."user_message" ADD CONSTRAINT "fkgqi0xp9xyd3cy6xobx0stv0ph" FOREIGN KEY ("type") REFERENCES "public"."message_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."wf_action_comment" ADD CONSTRAINT "wf_action_comment_fk1" FOREIGN KEY ("action_detail_id") REFERENCES "public"."wf_action_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
