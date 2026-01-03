// AI Sales Assistant Service - Rule-based Lead Intelligence

interface LeadData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status: string;
  priority?: string;
  budget?: number;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
  last_contact?: Date;
  follow_ups_count?: number;
  calls_count?: number;
}

interface LeadInsight {
  score: number;
  scoreLabel: string;
  conversionProbability: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  bestTimeToCall: string;
  nextAction: string;
  riskFactors: string[];
  opportunities: string[];
}

interface AIResponse {
  message: string;
  insights?: LeadInsight;
  suggestions?: string[];
  data?: any;
}

// Lead scoring weights
const SCORING_WEIGHTS = {
  hasEmail: 10,
  hasPhone: 15,
  hasCompany: 10,
  hasBudget: 20,
  recentActivity: 15,
  followUpResponsiveness: 15,
  sourceQuality: 15,
};

// Source quality scores
const SOURCE_QUALITY: Record<string, number> = {
  referral: 100,
  website: 80,
  linkedin: 75,
  google_ads: 70,
  facebook: 60,
  cold_call: 40,
  other: 50,
};

// Status progression scores
const STATUS_SCORES: Record<string, number> = {
  new: 20,
  contacted: 40,
  qualified: 60,
  proposal: 75,
  negotiation: 85,
  won: 100,
  lost: 0,
};

export class AIService {

  // Calculate lead score (0-100)
  calculateLeadScore(lead: LeadData): number {
    let score = 0;

    // Contact information completeness
    if (lead.email) score += SCORING_WEIGHTS.hasEmail;
    if (lead.phone) score += SCORING_WEIGHTS.hasPhone;
    if (lead.company) score += SCORING_WEIGHTS.hasCompany;

    // Budget indicator
    if (lead.budget && lead.budget > 0) {
      const budgetScore = Math.min(lead.budget / 10000, 1) * SCORING_WEIGHTS.hasBudget;
      score += budgetScore;
    }

    // Recent activity bonus
    if (lead.updated_at) {
      const daysSinceUpdate = this.daysBetween(new Date(lead.updated_at), new Date());
      if (daysSinceUpdate <= 1) score += SCORING_WEIGHTS.recentActivity;
      else if (daysSinceUpdate <= 3) score += SCORING_WEIGHTS.recentActivity * 0.8;
      else if (daysSinceUpdate <= 7) score += SCORING_WEIGHTS.recentActivity * 0.5;
    }

    // Source quality
    const sourceScore = SOURCE_QUALITY[lead.source?.toLowerCase() || 'other'] || 50;
    score += (sourceScore / 100) * SCORING_WEIGHTS.sourceQuality;

    return Math.min(Math.round(score), 100);
  }

  // Get score label
  getScoreLabel(score: number): string {
    if (score >= 80) return 'Hot Lead';
    if (score >= 60) return 'Warm Lead';
    if (score >= 40) return 'Nurturing';
    return 'Cold Lead';
  }

  // Calculate conversion probability
  calculateConversionProbability(lead: LeadData): number {
    const statusScore = STATUS_SCORES[lead.status?.toLowerCase()] || 20;
    const leadScore = this.calculateLeadScore(lead);

    // Weighted combination
    const probability = (statusScore * 0.6) + (leadScore * 0.4);
    return Math.round(probability);
  }

  // Determine urgency level
  determineUrgency(lead: LeadData): 'low' | 'medium' | 'high' | 'critical' {
    const referenceDate = lead.last_contact || lead.created_at || new Date();
    const daysSinceContact = this.daysBetween(new Date(referenceDate), new Date());

    const status = lead.status?.toLowerCase();

    // Critical: Hot leads going cold
    if (status === 'negotiation' && daysSinceContact > 2) return 'critical';
    if (status === 'proposal' && daysSinceContact > 3) return 'critical';

    // High: Active leads needing attention
    if (status === 'qualified' && daysSinceContact > 2) return 'high';
    if (status === 'contacted' && daysSinceContact > 5) return 'high';

    // Medium: Standard follow-up needed
    if (daysSinceContact > 7) return 'medium';

    return 'low';
  }

  // Generate recommendations
  generateRecommendations(lead: LeadData): string[] {
    const recommendations: string[] = [];
    const referenceDate = lead.last_contact || lead.created_at || new Date();
    const daysSinceContact = this.daysBetween(new Date(referenceDate), new Date());

    const status = lead.status?.toLowerCase();

    // Contact info recommendations
    if (!lead.phone) {
      recommendations.push('Request phone number for faster communication');
    }
    if (!lead.company) {
      recommendations.push('Identify company details for better qualification');
    }

    // Status-based recommendations
    if (status === 'new') {
      recommendations.push('Make initial contact within 24 hours for best results');
      recommendations.push('Prepare introduction pitch highlighting key value propositions');
    } else if (status === 'contacted') {
      recommendations.push('Schedule a discovery call to understand needs');
      recommendations.push('Send relevant case studies or testimonials');
    } else if (status === 'qualified') {
      recommendations.push('Prepare customized proposal based on requirements');
      recommendations.push('Identify decision makers and stakeholders');
    } else if (status === 'proposal') {
      recommendations.push('Follow up on proposal within 48 hours');
      recommendations.push('Address any objections or concerns proactively');
    } else if (status === 'negotiation') {
      recommendations.push('Prepare flexible pricing options');
      recommendations.push('Highlight ROI and value over competitors');
    }

    // Time-based recommendations
    if (daysSinceContact > 7 && status !== 'won' && status !== 'lost') {
      recommendations.push(`It's been ${daysSinceContact} days since last contact - reach out today!`);
    }

    // Budget recommendations
    if (!lead.budget) {
      recommendations.push('Qualify budget during next conversation');
    }

    return recommendations.slice(0, 5); // Max 5 recommendations
  }

  // Get best time to call
  getBestTimeToCall(): string {
    const hour = new Date().getHours();

    if (hour < 9) return 'Best time to call: 10:00 AM - 11:30 AM (Morning productivity window)';
    if (hour < 12) return 'Good time to call now! Morning hours have high answer rates';
    if (hour < 14) return 'Best time to call: 2:00 PM - 4:00 PM (Post-lunch productivity)';
    if (hour < 17) return 'Good time to call now! Afternoon decision-making hours';
    return 'Best time to call: Tomorrow 10:00 AM - 11:30 AM';
  }

  // Get next action
  getNextAction(lead: LeadData): string {
    const status = lead.status?.toLowerCase();
    const referenceDate = lead.last_contact || lead.created_at || new Date();
    const daysSinceContact = this.daysBetween(new Date(referenceDate), new Date());

    if (status === 'new') return 'Make initial contact call';
    if (status === 'contacted' && daysSinceContact > 2) return 'Send follow-up email with value proposition';
    if (status === 'contacted') return 'Schedule discovery meeting';
    if (status === 'qualified') return 'Prepare and send proposal';
    if (status === 'proposal' && daysSinceContact > 1) return 'Follow up on proposal status';
    if (status === 'proposal') return 'Wait for response, prepare negotiation strategy';
    if (status === 'negotiation') return 'Close the deal - finalize terms';

    return 'Review lead status and update CRM';
  }

  // Identify risk factors
  identifyRiskFactors(lead: LeadData): string[] {
    const risks: string[] = [];
    const referenceDate = lead.last_contact || lead.created_at || new Date();
    const daysSinceContact = this.daysBetween(new Date(referenceDate), new Date());

    if (daysSinceContact > 14) {
      risks.push('Lead going cold - no contact in 2+ weeks');
    }
    if (daysSinceContact > 7) {
      risks.push('Risk of losing interest - follow up needed');
    }
    if (!lead.phone && !lead.email) {
      risks.push('No contact information available');
    }
    if (lead.status === 'proposal' && daysSinceContact > 5) {
      risks.push('Proposal may be stale - competitor risk');
    }
    if (lead.priority === 'low' && lead.status === 'qualified') {
      risks.push('Low priority qualified lead - may lose momentum');
    }

    return risks;
  }

  // Identify opportunities
  identifyOpportunities(lead: LeadData): string[] {
    const opportunities: string[] = [];

    if (lead.budget && lead.budget > 50000) {
      opportunities.push('High-value opportunity - prioritize personal attention');
    }
    if (lead.source === 'referral') {
      opportunities.push('Referral lead - higher trust, faster close potential');
    }
    if (lead.company) {
      opportunities.push('B2B opportunity - potential for larger deal size');
    }
    if (lead.status === 'qualified' || lead.status === 'proposal') {
      opportunities.push('Advanced stage - focus on closing');
    }

    if (lead.created_at) {
      const daysSinceCreated = this.daysBetween(new Date(lead.created_at), new Date());
      if (daysSinceCreated < 3) {
        opportunities.push('Fresh lead - strike while interest is high');
      }
    }

    return opportunities;
  }

  // Get complete lead insight
  getLeadInsight(lead: LeadData): LeadInsight {
    const score = this.calculateLeadScore(lead);

    return {
      score,
      scoreLabel: this.getScoreLabel(score),
      conversionProbability: this.calculateConversionProbability(lead),
      urgency: this.determineUrgency(lead),
      recommendations: this.generateRecommendations(lead),
      bestTimeToCall: this.getBestTimeToCall(),
      nextAction: this.getNextAction(lead),
      riskFactors: this.identifyRiskFactors(lead),
      opportunities: this.identifyOpportunities(lead),
    };
  }

  // Process chat message
  processMessage(message: string, context?: { leads?: LeadData[], currentLead?: LeadData }): AIResponse {
    const lowerMessage = message.toLowerCase();

    // Greeting responses
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
      return {
        message: "Hello! I'm your AI Sales Assistant. I can help you with:\n\n" +
          "• Lead scoring and insights\n" +
          "• Follow-up recommendations\n" +
          "• Best time to call suggestions\n" +
          "• Conversion probability analysis\n" +
          "• Sales strategy tips\n\n" +
          "What would you like to know?",
        suggestions: [
          "Analyze my leads",
          "Show hot leads",
          "Best practices for follow-ups",
          "How to improve conversion?"
        ]
      };
    }

    // Lead analysis
    if (lowerMessage.includes('analyze') && lowerMessage.includes('lead')) {
      if (context?.currentLead) {
        const insight = this.getLeadInsight(context.currentLead);
        return {
          message: `📊 **Lead Analysis: ${context.currentLead.name}**\n\n` +
            `**Score:** ${insight.score}/100 (${insight.scoreLabel})\n` +
            `**Conversion Probability:** ${insight.conversionProbability}%\n` +
            `**Urgency:** ${insight.urgency.toUpperCase()}\n\n` +
            `**Next Action:** ${insight.nextAction}\n\n` +
            `**Recommendations:**\n${insight.recommendations.map(r => `• ${r}`).join('\n')}`,
          insights: insight
        };
      }
      return {
        message: "Please select a lead first, then I can provide detailed analysis.",
        suggestions: ["Show all leads", "Filter hot leads", "Recent leads"]
      };
    }

    // Hot leads
    if (lowerMessage.includes('hot lead') || lowerMessage.includes('best lead')) {
      if (context?.leads && context.leads.length > 0) {
        const scoredLeads = context.leads
          .map(lead => ({ lead, score: this.calculateLeadScore(lead) }))
          .filter(item => item.score >= 70)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        if (scoredLeads.length > 0) {
          return {
            message: `🔥 **Top ${scoredLeads.length} Hot Leads:**\n\n` +
              scoredLeads.map((item, i) =>
                `${i + 1}. **${item.lead.name}** - Score: ${item.score}/100\n   Status: ${item.lead.status}`
              ).join('\n\n'),
            suggestions: ["Analyze first lead", "Show follow-up tips", "Export hot leads"]
          };
        }
      }
      return {
        message: "No hot leads found at the moment. Focus on nurturing your existing leads to improve their scores.",
        suggestions: ["How to improve lead scores?", "Lead nurturing tips", "Show all leads"]
      };
    }

    // Follow-up advice
    if (lowerMessage.includes('follow') || lowerMessage.includes('follow-up')) {
      return {
        message: "📞 **Follow-up Best Practices:**\n\n" +
          "**Timing:**\n" +
          "• First follow-up: Within 24 hours of initial contact\n" +
          "• Subsequent follow-ups: 2-3 days apart\n" +
          "• Best times: 10-11 AM or 2-4 PM\n\n" +
          "**Methods:**\n" +
          "• Day 1: Phone call\n" +
          "• Day 3: Email with value content\n" +
          "• Day 5: Phone + SMS\n" +
          "• Day 7: LinkedIn connection\n\n" +
          "**Key Tips:**\n" +
          "• Always provide value in each touchpoint\n" +
          "• Reference previous conversations\n" +
          "• Keep it short and action-oriented",
        suggestions: ["Show overdue follow-ups", "Schedule follow-up", "Follow-up templates"]
      };
    }

    // Conversion tips
    if (lowerMessage.includes('conversion') || lowerMessage.includes('convert')) {
      return {
        message: "📈 **Conversion Optimization Tips:**\n\n" +
          "**1. Speed to Lead**\n" +
          "Contact new leads within 5 minutes for 9x higher conversion\n\n" +
          "**2. Multi-touch Approach**\n" +
          "Use phone, email, and social media - 6-8 touches on average to convert\n\n" +
          "**3. Personalization**\n" +
          "Reference specific needs and pain points from discovery\n\n" +
          "**4. Social Proof**\n" +
          "Share relevant case studies and testimonials\n\n" +
          "**5. Create Urgency**\n" +
          "Limited-time offers or deadline-based incentives\n\n" +
          "**6. Handle Objections**\n" +
          "Prepare responses for common objections proactively",
        suggestions: ["Show leads by stage", "Objection handling tips", "Closing techniques"]
      };
    }

    // Objection handling
    if (lowerMessage.includes('objection')) {
      return {
        message: "🎯 **Common Objections & Responses:**\n\n" +
          "**\"It's too expensive\"**\n" +
          "→ Focus on ROI and value, not just cost. Break down cost per day/use.\n\n" +
          "**\"I need to think about it\"**\n" +
          "→ \"What specific concerns can I address right now?\"\n\n" +
          "**\"We're using a competitor\"**\n" +
          "→ Highlight unique differentiators, offer comparison or trial.\n\n" +
          "**\"Not the right time\"**\n" +
          "→ Schedule future follow-up, stay on their radar with value content.\n\n" +
          "**\"I need to check with my team\"**\n" +
          "→ Offer to present to the team or provide materials they can share.",
        suggestions: ["More objection tips", "Closing techniques", "Negotiation strategies"]
      };
    }

    // Closing techniques
    if (lowerMessage.includes('closing') || lowerMessage.includes('close deal')) {
      return {
        message: "🏆 **Effective Closing Techniques:**\n\n" +
          "**1. Assumptive Close**\n" +
          "\"Should we proceed with the standard or premium package?\"\n\n" +
          "**2. Urgency Close**\n" +
          "\"This pricing is available until Friday - shall we lock it in?\"\n\n" +
          "**3. Summary Close**\n" +
          "Recap all benefits and value before asking for commitment\n\n" +
          "**4. Question Close**\n" +
          "\"Is there any reason we shouldn't move forward today?\"\n\n" +
          "**5. Trial Close**\n" +
          "\"How does this solution sound so far?\" - gauge readiness",
        suggestions: ["Negotiation tips", "Handle price objections", "Post-close follow-up"]
      };
    }

    // Default response
    return {
      message: "I'm here to help with your sales process! Here are some things I can assist with:",
      suggestions: [
        "Analyze my leads",
        "Show hot leads",
        "Follow-up best practices",
        "How to improve conversion?",
        "Objection handling tips",
        "Closing techniques"
      ]
    };
  }

  // Helper: Calculate days between dates
  private daysBetween(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Get dashboard insights
  getDashboardInsights(leads: LeadData[]): {
    totalLeads: number;
    hotLeads: number;
    needsAttention: number;
    avgScore: number;
    topRecommendation: string;
  } {
    if (!leads || leads.length === 0) {
      return {
        totalLeads: 0,
        hotLeads: 0,
        needsAttention: 0,
        avgScore: 0,
        topRecommendation: 'Start by adding new leads to your pipeline'
      };
    }

    const scores = leads.map(lead => this.calculateLeadScore(lead));
    const hotLeads = scores.filter(s => s >= 70).length;
    const needsAttention = leads.filter(lead =>
      this.determineUrgency(lead) === 'high' || this.determineUrgency(lead) === 'critical'
    ).length;
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    let topRecommendation = '';
    if (needsAttention > 0) {
      topRecommendation = `${needsAttention} leads need immediate attention - follow up today!`;
    } else if (hotLeads > 0) {
      topRecommendation = `Focus on your ${hotLeads} hot leads to maximize conversions`;
    } else {
      topRecommendation = 'Nurture your leads with valuable content and regular follow-ups';
    }

    return {
      totalLeads: leads.length,
      hotLeads,
      needsAttention,
      avgScore,
      topRecommendation
    };
  }
}

export const aiService = new AIService();
