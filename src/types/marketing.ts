export interface OtoMarketerResponse {
  visual_analysis: {
    detected_features: string[];
    color_palette: string[];
    material_and_quality: string;
    target_audience_demographics: string;
  };
  seo_strategy: {
    ai_first_title: string;
    product_description_html: string;
    long_tail_keywords: string[];
    structured_data_json_ld: Record<string, any>;
  };
  growth_campaign: {
    perceived_value_pricing_tip: string;
    promotional_campaign_idea: string;
    ad_copy: {
      meta_instagram: string;
      tiktok_hook_and_script: string;
    };
  };
}