import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiMousePointer, FiSend } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../services/api';
import StatsCard from '../../components/dashboard/StatsCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalVisits: 0,
    totalProjectClicks: 0,
    totalContactSubmits: 0,
  });
  const [dateRange, setDateRange] = useState('30');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [visitsData, setVisitsData] = useState(null);
  const [topPagesData, setTopPagesData] = useState(null);
  const [eventTypesData, setEventTypesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError('');

      let params = {};

      if (dateRange === 'custom' && startDate && endDate) {
        params.startDate = startDate.toISOString();
        params.endDate = endDate.toISOString();
      } else {
        params.days = dateRange;
      }

      const response = await api.get('/analytics/dashboard', { params });
      const data = response.data;

      // Set stats
      setStats({
        totalVisits: data.totalViews || 0,
        totalProjectClicks: data.totalProjectClicks || 0,
        totalContactSubmits: data.totalContactSubmits || 0,
      });

      // Visits per day chart
      const visitsPerDay = data.visitsPerDay || [];
      setVisitsData({
        labels: visitsPerDay.map((item) => item.date),
        datasets: [
          {
            label: 'Visites',
            data: visitsPerDay.map((item) => item.count),
            borderColor: '#edff20',
            backgroundColor: 'rgba(237, 255, 32, 0.1)',
            tension: 0.4,
          },
        ],
      });

      // Top pages bar chart
      const topPages = data.topPages || [];
      setTopPagesData({
        labels: topPages.map((item) => item.page),
        datasets: [
          {
            label: 'Visites',
            data: topPages.map((item) => item.count),
            backgroundColor: 'rgba(237, 255, 32, 0.8)',
          },
        ],
      });

      // Event types pie chart
      const eventTypes = data.eventTypes || [];
      setEventTypesData({
        labels: eventTypes.map((item) => item.type),
        datasets: [
          {
            data: eventTypes.map((item) => item.count),
            backgroundColor: [
              'rgba(237, 255, 32, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
            ],
          },
        ],
      });
    } catch (err) {
      console.error('Erreur lors du chargement des analytics:', err);
      setError('Erreur lors du chargement des données analytiques');

      // Set empty data to avoid errors
      setVisitsData({
        labels: [],
        datasets: [
          {
            label: 'Visites',
            data: [],
            borderColor: '#edff20',
            backgroundColor: 'rgba(237, 255, 32, 0.1)',
          },
        ],
      });
      setTopPagesData({
        labels: [],
        datasets: [{ label: 'Visites', data: [], backgroundColor: 'rgba(237, 255, 32, 0.8)' }],
      });
      setEventTypesData({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, startDate, endDate]);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    if (range !== 'custom') {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e4e4e7',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#a1a1aa' },
        grid: { color: 'rgba(237, 255, 32, 0.1)' },
      },
      y: {
        ticks: { color: '#a1a1aa' },
        grid: { color: 'rgba(237, 255, 32, 0.1)' },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text-green mb-2">Analytics</h1>
          <p className="text-textColor/70">Suivez les performances de votre portfolio</p>
        </div>

        {/* Date range selector */}
        <div className="flex items-center space-x-2">
          {['7', '30', '90', 'custom'].map((range) => (
            <button
              key={range}
              onClick={() => handleDateRangeChange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                dateRange === range
                  ? 'bg-designColor text-bodyColor'
                  : 'bg-designColor/10 text-textColor hover:bg-designColor/20'
              }`}
            >
              {range === 'custom' ? 'Personnalisé' : `${range} jours`}
            </button>
          ))}
        </div>
      </div>

      {/* Custom date range */}
      {dateRange === 'custom' && (
        <div className="glass-card p-4 rounded-lg flex items-center space-x-4">
          <div>
            <label className="block text-sm text-textColor/70 mb-1">Date de début</label>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <label className="block text-sm text-textColor/70 mb-1">Date de fin</label>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 px-4 py-3 rounded-lg">
          {error} - Les données affichées peuvent être partielles ou vides.
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Visites" value={stats.totalVisits} icon={FiEye} loading={loading} />
        <StatsCard
          title="Clics sur Projets"
          value={stats.totalProjectClicks}
          icon={FiMousePointer}
          loading={loading}
        />
        <StatsCard
          title="Formulaires Envoyés"
          value={stats.totalContactSubmits}
          icon={FiSend}
          loading={loading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits line chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-textColor mb-4">Visites par jour</h3>
          <div className="h-64">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-textColor/50">Chargement...</div>
              </div>
            ) : (
              <AnalyticsChart type="line" data={visitsData} options={chartOptions} />
            )}
          </div>
        </motion.div>

        {/* Top pages bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-textColor mb-4">Top 5 pages visitées</h3>
          <div className="h-64">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-textColor/50">Chargement...</div>
              </div>
            ) : (
              <AnalyticsChart type="bar" data={topPagesData} options={chartOptions} />
            )}
          </div>
        </motion.div>
      </div>

      {/* Event types pie chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-textColor mb-4">Types d'événements</h3>
        <div className="h-64 flex items-center justify-center">
          {loading ? (
            <div className="animate-pulse text-textColor/50">Chargement...</div>
          ) : (
            <div className="w-64 h-64">
              <AnalyticsChart
                type="pie"
                data={eventTypesData}
                options={{
                  ...chartOptions,
                  scales: undefined,
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
