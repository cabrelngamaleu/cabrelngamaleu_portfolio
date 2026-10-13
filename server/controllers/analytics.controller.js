const Analytics = require('../models/Analytics');

/**
 * @desc    Create analytics event
 * @route   POST /api/analytics/event
 * @access  Public
 */
const createEvent = async (req, res) => {
  try {
    const { event, page, referrer, userAgent } = req.body;

    const analyticsEvent = await Analytics.create({
      event,
      page,
      referrer,
      userAgent: userAgent || req.headers['user-agent'],
    });

    res.status(201).json({
      success: true,
      data: analyticsEvent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Erreur lors de la création de l'événement",
      error: error.message,
    });
  }
};

/**
 * @desc    Get analytics dashboard with aggregated stats
 * @route   GET /api/analytics/dashboard
 * @access  Private/Admin
 */
const getDashboard = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total visits
    const totalVisits = await Analytics.countDocuments({ event: 'page_view' });

    // Visits by time period
    const visitsToday = await Analytics.countDocuments({
      event: 'page_view',
      timestamp: { $gte: startOfDay },
    });

    const visitsThisWeek = await Analytics.countDocuments({
      event: 'page_view',
      timestamp: { $gte: startOfWeek },
    });

    const visitsThisMonth = await Analytics.countDocuments({
      event: 'page_view',
      timestamp: { $gte: startOfMonth },
    });

    // Event counts
    const eventCounts = await Analytics.aggregate([
      {
        $group: {
          _id: '$event',
          count: { $sum: 1 },
        },
      },
    ]);

    // Top pages
    const topPages = await Analytics.aggregate([
      {
        $match: { event: 'page_view', page: { $exists: true, $ne: null } },
      },
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Visits by day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const visitsByDay = await Analytics.aggregate([
      {
        $match: {
          event: 'page_view',
          timestamp: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalVisits,
        visitsToday,
        visitsThisWeek,
        visitsThisMonth,
        eventCounts,
        topPages,
        visitsByDay,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getDashboard,
};
