require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

/**
 * Seed database with sample data
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connecté à MongoDB');

    // Clear existing data (optional - comment out if you don't want to clear)
    // await Project.deleteMany();
    // await BlogPost.deleteMany();
    // console.log('🗑️  Données existantes supprimées');

    // Create sample projects
    const projects = [
      {
        title: 'Portfolio Personnel',
        description: 'Site portfolio moderne avec React et Node.js',
        longDescription: 'Un portfolio complet avec backend API, gestion de contenu et analytics.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        category: 'fullstack',
        featured: true,
        order: 1,
      },
      {
        title: 'Application E-commerce',
        description: 'Plateforme de vente en ligne avec panier et paiement',
        longDescription: 'Application e-commerce complète avec gestion des produits, panier et intégration Stripe.',
        technologies: ['React', 'Redux', 'Node.js', 'Stripe', 'PostgreSQL'],
        category: 'web',
        featured: true,
        order: 2,
      },
      {
        title: 'Blog Management System',
        description: 'Système de gestion de blog avec markdown',
        technologies: ['Vue.js', 'Express', 'MongoDB'],
        category: 'fullstack',
        order: 3,
      },
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log(`✅ ${createdProjects.length} projets créés`);

    // Create sample blog posts
    const blogPosts = [
      {
        title: 'Introduction au développement full-stack',
        slug: 'introduction-developpement-full-stack',
        content: '# Introduction\n\nLe développement full-stack combine frontend et backend...',
        excerpt: 'Découvrez les bases du développement full-stack moderne',
        tags: ['JavaScript', 'Full-Stack', 'Tutorial'],
        category: 'Développement',
        published: true,
      },
      {
        title: 'Les meilleures pratiques en React',
        slug: 'meilleures-pratiques-react',
        content: '# Les bonnes pratiques\n\nReact offre de nombreuses possibilités...',
        excerpt: 'Guide des meilleures pratiques pour développer avec React',
        tags: ['React', 'JavaScript', 'Best Practices'],
        category: 'Frontend',
        published: true,
      },
      {
        title: 'Sécurité des API REST',
        slug: 'securite-api-rest',
        content: '# Sécuriser vos APIs\n\nLa sécurité est primordiale...',
        excerpt: 'Apprenez à sécuriser vos APIs REST avec JWT et autres techniques',
        tags: ['API', 'Security', 'Backend'],
        category: 'Backend',
        published: false,
      },
    ];

    const createdBlogPosts = await BlogPost.insertMany(blogPosts);
    console.log(`✅ ${createdBlogPosts.length} articles de blog créés`);

    // Create admin user if none exists
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Utilisateur admin créé');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Mot de passe: admin123');
    } else {
      console.log(`ℹ️  ${userCount} utilisateur(s) déjà existant(s)`);
    }

    console.log('\n✨ Base de données initialisée avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

seedDatabase();
