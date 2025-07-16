[
  {
    "function_name": "calc_eal",
    "return_type": "TABLE(eal_low numeric, eal_ml numeric, eal_high numeric)",
    "arguments": "_finding_id integer",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "calc_eal_per_finding",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "calculate_dow_eal_advanced",
    "return_type": "TABLE(eal_low integer, eal_ml integer, eal_high integer, eal_daily integer, calculation_details jsonb)",
    "arguments": "base_unit_cost numeric, multiplier_type character varying, service_detected character varying, auth_bypass_prob numeric, sustained_rps integer, attack_complexity character varying, endpoint_url text DEFAULT NULL::text",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "calculate_finding_eal_v3",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": "EAL calculation v3: Implements revised parameters with $250k baseline, \nreduced severity multipliers (CRITICAL=2x), narrowed confidence bands (0.6-1.4),\nautomatic attack_type_code assignment, and comprehensive error handling."
  },
  {
    "function_name": "enhance_breach_descriptions",
    "return_type": "void",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "enqueue_threat_snapshot",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY DEFINER",
    "description": null
  },
  {
    "function_name": "populate_finding_scan_id",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "update_brief_counts",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  },
  {
    "function_name": "update_dow_eal_values_advanced",
    "return_type": "trigger",
    "arguments": "",
    "security": "SECURITY INVOKER",
    "description": null
  }
]