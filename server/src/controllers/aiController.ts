import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { aiService } from '../services/aiService';
import { Lead } from '../models';

// Chat with AI Assistant
export const chat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { message, leadId } = req.body;

    if (!message) {
      res.status(400).json({ message: 'Message is required' });
      return;
    }

    // Get context if lead ID provided
    let currentLead = null;
    let leads: any[] = [];

    if (leadId) {
      currentLead = await Lead.findByPk(leadId);
    }

    // Get user's leads for context
    const userLeads = await Lead.findAll({
      where: req.user?.role === 'admin' ? {} : { assigned_to: req.user?.id },
      limit: 50,
      order: [['updated_at', 'DESC']]
    });

    leads = userLeads.map(lead => lead.toJSON());

    const response = aiService.processMessage(message, {
      currentLead: currentLead?.toJSON(),
      leads
    });

    res.json(response);
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ message: 'Failed to process message' });
  }
};

// Get lead insights
export const getLeadInsight = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByPk(id);

    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }

    const insight = aiService.getLeadInsight(lead.toJSON());

    res.json({
      lead: lead.toJSON(),
      insight
    });
  } catch (error) {
    console.error('Lead Insight Error:', error);
    res.status(500).json({ message: 'Failed to get lead insight' });
  }
};

// Get dashboard AI insights
export const getDashboardInsights = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Get user's leads
    const whereClause = req.user?.role === 'admin' ? {} : { assigned_to: req.user?.id };

    const leads = await Lead.findAll({
      where: whereClause,
      order: [['updated_at', 'DESC']]
    });

    const leadsData = leads.map(lead => lead.toJSON());
    const insights = aiService.getDashboardInsights(leadsData);

    // Get urgent leads
    const urgentLeads = leadsData
      .filter(lead => {
        const urgency = aiService.getLeadInsight(lead).urgency;
        return urgency === 'high' || urgency === 'critical';
      })
      .slice(0, 5)
      .map(lead => ({
        id: lead.id,
        name: lead.name,
        status: lead.status,
        urgency: aiService.getLeadInsight(lead).urgency,
        nextAction: aiService.getLeadInsight(lead).nextAction
      }));

    // Get hot leads
    const hotLeads = leadsData
      .map(lead => ({ lead, score: aiService.getLeadInsight(lead).score }))
      .filter(item => item.score >= 70)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => ({
        id: item.lead.id,
        name: item.lead.name,
        score: item.score,
        status: item.lead.status
      }));

    res.json({
      ...insights,
      urgentLeads,
      hotLeads
    });
  } catch (error) {
    console.error('Dashboard Insights Error:', error);
    res.status(500).json({ message: 'Failed to get dashboard insights' });
  }
};

// Bulk analyze leads
export const analyzeLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const whereClause = req.user?.role === 'admin' ? {} : { assigned_to: req.user?.id };

    const leads = await Lead.findAll({
      where: whereClause,
      order: [['updated_at', 'DESC']],
      limit: 100
    });

    const analysis = leads.map(lead => {
      const leadData = lead.toJSON();
      const insight = aiService.getLeadInsight(leadData);

      return {
        id: leadData.id,
        name: leadData.name,
        email: leadData.email,
        status: leadData.status,
        score: insight.score,
        scoreLabel: insight.scoreLabel,
        conversionProbability: insight.conversionProbability,
        urgency: insight.urgency,
        nextAction: insight.nextAction
      };
    });

    // Sort by score descending
    analysis.sort((a, b) => b.score - a.score);

    res.json({
      totalAnalyzed: analysis.length,
      leads: analysis
    });
  } catch (error) {
    console.error('Analyze Leads Error:', error);
    res.status(500).json({ message: 'Failed to analyze leads' });
  }
};
