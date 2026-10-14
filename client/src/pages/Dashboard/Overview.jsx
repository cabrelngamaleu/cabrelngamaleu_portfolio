import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiFileText, FiMail, FiEye, FiRefreshCw } from 'react-icons/fi';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../../services/api';
import StatsCard from '../../components/dashboard/StatsCard';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalPosts: 0,
    unreadMessages: 0,
    totalViews: 0,
  });
  const [visitsData, setVisitsData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setError('');
      const [projects, posts, messages, analytics] = await Promise.all([
        api.get('/projects'),
        api.get('/blog'),
        api.get('/messages?read=false'),
        api.get('/analytics/dashboard').catch(() => ({ data: { totalViews: 0, visitsPerDay: [], projectsByCategory: [] } })),
      ]);

      // Set stats
      setStats({
        totalProjects: projects.data.length || 0,
        totalPosts: posts.data.length || 0,
        unreadMessages: messages.data.length || 0,
        totalViews: analytics.data.totalViews || 0,
      });

      // Visits per day chart data (last 30 days)
      const visitsPerDay = analytics.data.visitsPerDay || [];
      setVisitsData({
        labels: visitsPerDay.map((item) => item.date).slice(-30),
        datasets: [
          {
            label: 'Visites',
            data: visitsPerDay.map((item) => item.count).slice(-30),
            borderColor: '#edff20',
            backgroundColor: 'rgba(237, 255, 32, 0.1)',
            tension: 0.4,
          },
        ],
      });

      // Projects by category chart data
      const categoryCounts = {};
      projects.data.forEach((project) => {
        const category = project.category || 'Autre';
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
      
      setProjectsData({
        labels: Object.keys(categoryCounts),
        datasets: [
          {
            label: 'Projets',
            data: Object.values(categoryCounts),
            backgroundColor: [
              'rgba(237, 255, 32, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
              'rgba(34, 197, 94, 0.8)',
            ],
          },
        ],
      });

      // Blog posts: published vs drafts
      const publishedCount = posts.data.filter((post) => post.published).length;
      const draftCount = posts.data.length - publishedCount;
      
      setPostsData({
        labels: ['Publiés', 'Brouillons'],
        datasets: [
          {
            data: [publishedCount, draftCount],
            backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(251, 191, 36, 0.8)'],
          },
        ],
      });
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      setError('Erreur lors du chargement des données. Veuillez réessayer.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={handleRefresh}
          className="px-6 py-2 bg-designColor hover:bg-designColor/90 text-bodyColor rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text-green mb-2">
            Vue d'ensemble
          </h1>
          <p className="text-textColor/70">
            Bienvenue sur votre tableau de bord
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-designColor/10 hover:bg-designColor/20 text-designColor rounded-lg transition-colors disabled:opacity-50"
        >
          <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projets"
          value={stats.totalProjects}
          icon={FiFolder}
          loading={loading}
        />
        <StatsCard
          title="Total Articles"
          value={stats.totalPosts}
          icon={FiFileText}
          loading={loading}
        />
        <StatsCard
          title="Messages Non Lus"
          value={stats.unreadMessages}
          icon={FiMail}
          loading={loading}
        />
        <StatsCard
          title="Total Vues"
          value={stats.totalViews}
          icon={FiEye}
          loading={loading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits line chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-textColor mb-4">
            Visites (30 derniers jours)
          </h3>
          <div className="h-64">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-textColor/50">Chargement...</div>
              </div>
            ) : visitsData ? (
              <Line data={visitsData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-textColor/50">
                Aucune donnée disponible
              </div>
            )}
          </div>
        </motion.div>

        {/* Projects by category bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-textColor mb-4">
            Projets par catégorie
          </h3>
          <div className="h-64">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-textColor/50">Chargement...</div>
              </div>
            ) : projectsData ? (
              <Bar data={projectsData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-textColor/50">
                Aucune donnée disponible
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Blog posts doughnut chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-textColor mb-4">
          Articles de blog
        </h3>
        <div className="h-64 flex items-center justify-center">
          {loading ? (
            <div className="animate-pulse text-textColor/50">Chargement...</div>
          ) : postsData ? (
            <div className="w-64 h-64">
              <Doughnut
                data={postsData}
                options={{
                  ...chartOptions,
                  scales: undefined,
                }}
              />
            </div>
          ) : (
            <div className="text-textColor/50">Aucune donnée disponible</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
