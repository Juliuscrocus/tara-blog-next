// Articles data - sera remplacé par Notion API plus tard
export const articles = [
  // CAFÉ
  {
    id: 1,
    slug: 'boot-cafe-le-secret-du-marais',
    title: 'Boot Café, le secret le mieux gardé du Marais',
    excerpt: 'Dans une cour cachée du Marais, ce café de poche sert l\'un des meilleurs flat whites de Paris. Une adresse que je garde précieusement.',
    category: 'cafes',
    categoryLabel: { fr: 'Cafés', en: 'Coffee' },
    city: 'Paris',
    date: '2024-11-15',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&auto=format&fit=crop',
    imageAlt: 'Intérieur chaleureux du Boot Café',
    featured: true,
    content: {
      fr: [
        {
          type: 'paragraph',
          text: 'Il y a des adresses qu\'on hésite à partager. Boot Café en fait partie. Niché dans une cour pavée du Marais, accessible uniquement par un passage discret, ce café de poche est devenu mon refuge parisien.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&auto=format&fit=crop',
          alt: 'Flat white servi au Boot Café',
          caption: 'Le flat white signature, servi dans une céramique artisanale'
        },
        {
          type: 'heading',
          text: 'Un café de spécialité sans prétention'
        },
        {
          type: 'paragraph',
          text: 'Ce qui frappe d\'abord, c\'est l\'odeur. Un mélange de grains fraîchement torréfiés et de croissants au beurre. Les propriétaires, un couple franco-australien, ont réussi le pari de créer un lieu authentique sans tomber dans les clichés du coffee shop hipster.'
        },
        {
          type: 'quote',
          text: 'Le meilleur café est celui qu\'on prend le temps de savourer.',
          author: 'Marie, co-fondatrice'
        },
        {
          type: 'paragraph',
          text: 'La carte est courte mais maîtrisée : espresso, flat white, pour-over. Pas de sirops, pas de lait d\'avoine aromatisé à la vanille. Juste du bon café, bien préparé.'
        },
        {
          type: 'heading',
          text: 'Mes recommandations'
        },
        {
          type: 'list',
          items: [
            'Le flat white avec les grains du moment',
            'Le cookie au chocolat noir et fleur de sel',
            'Venir en semaine, vers 10h, pour éviter la queue'
          ]
        },
        {
          type: 'paragraph',
          text: 'Boot Café n\'est pas qu\'un café, c\'est une parenthèse. Un endroit où le temps ralentit, où l\'on peut s\'asseoir sur un tabouret en bois et regarder les habitués défiler. C\'est Paris comme je l\'aime.'
        }
      ],
      en: [
        {
          type: 'paragraph',
          text: 'Some places you hesitate to share. Boot Café is one of them. Tucked away in a cobblestone courtyard in the Marais, accessible only through a discreet passage, this pocket-sized café has become my Parisian refuge.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&auto=format&fit=crop',
          alt: 'Flat white at Boot Café',
          caption: 'The signature flat white, served in artisanal ceramics'
        },
        {
          type: 'heading',
          text: 'Specialty coffee without pretension'
        },
        {
          type: 'paragraph',
          text: 'What strikes you first is the smell. A blend of freshly roasted beans and butter croissants. The owners, a Franco-Australian couple, managed to create an authentic place without falling into hipster coffee shop clichés.'
        },
        {
          type: 'quote',
          text: 'The best coffee is the one you take time to savor.',
          author: 'Marie, co-founder'
        },
        {
          type: 'paragraph',
          text: 'The menu is short but masterful: espresso, flat white, pour-over. No syrups, no vanilla oat milk. Just good coffee, well prepared.'
        },
        {
          type: 'heading',
          text: 'My recommendations'
        },
        {
          type: 'list',
          items: [
            'The flat white with beans of the moment',
            'The dark chocolate and sea salt cookie',
            'Come on weekdays, around 10am, to avoid the queue'
          ]
        },
        {
          type: 'paragraph',
          text: 'Boot Café is not just a café, it\'s a pause. A place where time slows down, where you can sit on a wooden stool and watch the regulars pass by. This is Paris as I love it.'
        }
      ]
    }
  },

  // GASTRONOMIE
  {
    id: 2,
    slug: 'septime-experience-gastronomique',
    title: 'Septime, l\'expérience gastronomique qui m\'a marquée',
    excerpt: 'Une étoile Michelin, des produits d\'exception, et une atmosphère décontractée. Septime redéfinit la gastronomie parisienne.',
    category: 'gastronomie',
    categoryLabel: { fr: 'Gastronomie', en: 'Gastronomy' },
    city: 'Paris',
    date: '2024-11-08',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&auto=format&fit=crop',
    imageAlt: 'Assiette gastronomique chez Septime',
    featured: true,
    content: {
      fr: [
        {
          type: 'paragraph',
          text: 'Il y a des restaurants qui changent votre vision de la cuisine. Septime, niché rue de Charonne dans le 11ème arrondissement, fait partie de ces adresses transformatrices. Après des mois d\'attente pour obtenir une réservation, j\'ai enfin pu découvrir ce qui se cache derrière le phénomène.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&auto=format&fit=crop',
          alt: 'Entrée végétale chez Septime',
          caption: 'L\'entrée végétale du menu dégustation, un tableau comestible'
        },
        {
          type: 'heading',
          text: 'Une philosophie du produit'
        },
        {
          type: 'paragraph',
          text: 'Chez Septime, pas de carte. Un menu dégustation unique, qui évolue au fil des saisons et des arrivages. Le chef Bertrand Grébaut travaille en direct avec des producteurs triés sur le volet, et ça se sent dans chaque bouchée.'
        },
        {
          type: 'paragraph',
          text: 'Le légume y est roi, traité avec autant de respect que le poisson ou la viande. Un navet peut devenir le héros d\'une assiette, caramélisé, fumé, sublimé.'
        },
        {
          type: 'quote',
          text: 'La cuisine, c\'est l\'art de transformer le simple en extraordinaire.',
          author: 'Bertrand Grébaut'
        },
        {
          type: 'heading',
          text: 'L\'atmosphère'
        },
        {
          type: 'paragraph',
          text: 'Oubliez les codes du restaurant étoilé traditionnel. Ici, le service est décontracté, la salle lumineuse, les tables en bois brut. On vient en jean, on parle fort, on rit. C\'est la bistronomie dans ce qu\'elle a de plus abouti.'
        },
        {
          type: 'list',
          items: [
            'Réserver 3-4 semaines à l\'avance minimum',
            'Budget : environ 95€ pour le menu dégustation',
            'Pensez à Septime La Cave juste à côté pour prolonger la soirée'
          ]
        },
        {
          type: 'paragraph',
          text: 'En sortant de Septime, j\'avais cette sensation rare : celle d\'avoir vécu quelque chose de spécial. Pas juste un bon repas, mais une véritable expérience sensorielle. Le genre d\'adresse qui vous rappelle pourquoi Paris reste la capitale mondiale de la gastronomie.'
        }
      ],
      en: [
        {
          type: 'paragraph',
          text: 'Some restaurants change your vision of cuisine. Septime, nestled on rue de Charonne in the 11th arrondissement, is one of those transformative addresses. After months of waiting to get a reservation, I finally discovered what lies behind the phenomenon.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&auto=format&fit=crop',
          alt: 'Vegetable starter at Septime',
          caption: 'The vegetable starter from the tasting menu, an edible painting'
        },
        {
          type: 'heading',
          text: 'A philosophy of produce'
        },
        {
          type: 'paragraph',
          text: 'At Septime, no menu. A unique tasting menu that evolves with the seasons and deliveries. Chef Bertrand Grébaut works directly with hand-picked producers, and you can taste it in every bite.'
        },
        {
          type: 'paragraph',
          text: 'Vegetables are king here, treated with as much respect as fish or meat. A turnip can become the hero of a dish, caramelized, smoked, elevated.'
        },
        {
          type: 'quote',
          text: 'Cooking is the art of transforming the simple into the extraordinary.',
          author: 'Bertrand Grébaut'
        },
        {
          type: 'heading',
          text: 'The atmosphere'
        },
        {
          type: 'paragraph',
          text: 'Forget the codes of traditional starred restaurants. Here, service is relaxed, the room bright, the tables raw wood. You come in jeans, talk loud, laugh. This is bistronomie at its finest.'
        },
        {
          type: 'list',
          items: [
            'Book 3-4 weeks in advance minimum',
            'Budget: around €95 for the tasting menu',
            'Consider Septime La Cave next door to extend the evening'
          ]
        },
        {
          type: 'paragraph',
          text: 'Leaving Septime, I had that rare feeling: having experienced something special. Not just a good meal, but a true sensory experience. The kind of address that reminds you why Paris remains the world capital of gastronomy.'
        }
      ]
    }
  },

  // VINS & SPIRITUEUX
  {
    id: 3,
    slug: 'caves-auge-temple-du-vin-naturel',
    title: 'Les Caves Augé, temple du vin naturel depuis 1850',
    excerpt: 'La plus ancienne cave de Paris m\'a fait découvrir des vins d\'exception. Une plongée dans l\'univers du vin naturel.',
    category: 'vins',
    categoryLabel: { fr: 'Vins & Spiritueux', en: 'Wine & Spirits' },
    city: 'Paris',
    date: '2024-10-25',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=800&auto=format&fit=crop',
    imageAlt: 'Bouteilles de vin aux Caves Augé',
    featured: true,
    content: {
      fr: [
        {
          type: 'paragraph',
          text: 'Boulevard Haussmann, entre les grands magasins et l\'agitation parisienne, se cache un trésor : Les Caves Augé. Fondée en 1850, c\'est la plus ancienne cave à vin de Paris encore en activité. Et probablement l\'une des meilleures.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=1200&h=800&auto=format&fit=crop',
          alt: 'Dégustation de vin',
          caption: 'Une dégustation improvisée, comme seules Les Caves Augé savent les faire'
        },
        {
          type: 'heading',
          text: 'Un pionnier du vin naturel'
        },
        {
          type: 'paragraph',
          text: 'Bien avant que le vin naturel ne devienne tendance, Les Caves Augé défendaient déjà les vignerons indépendants et les méthodes respectueuses. Marc Sibard, le propriétaire, a été l\'un des premiers à Paris à croire en cette révolution silencieuse.'
        },
        {
          type: 'paragraph',
          text: 'Pousser la porte de cette cave, c\'est entrer dans un autre monde. Les bouteilles s\'empilent du sol au plafond, les étiquettes racontent des histoires, et le conseil est toujours personnalisé.'
        },
        {
          type: 'quote',
          text: 'Le vin naturel, c\'est d\'abord une histoire de confiance entre le vigneron et la terre.',
          author: 'Marc Sibard'
        },
        {
          type: 'heading',
          text: 'Mes découvertes du jour'
        },
        {
          type: 'paragraph',
          text: 'Lors de ma dernière visite, Marc m\'a fait découvrir trois pépites que je n\'aurais jamais trouvées seule :'
        },
        {
          type: 'list',
          items: [
            'Un Gamay de Jean-Claude Lapalu, fruité et digeste',
            'Un Chenin de la Loire, minéral et tendu',
            'Un Poulsard du Jura, léger comme une plume'
          ]
        },
        {
          type: 'paragraph',
          text: 'Ce que j\'aime aux Caves Augé, c\'est cette absence de snobisme. On peut venir avec un budget de 12€ ou de 200€, on sera accueilli avec la même passion. Le vin n\'y est pas un produit de luxe, c\'est un art de vivre.'
        },
        {
          type: 'heading',
          text: 'Informations pratiques'
        },
        {
          type: 'paragraph',
          text: 'Les Caves Augé, 116 Boulevard Haussmann, 75008 Paris. Ouvert du mardi au samedi. Dégustations gratuites tous les samedis après-midi. Un conseil : venez avec du temps, on ne ressort jamais avec une seule bouteille.'
        }
      ],
      en: [
        {
          type: 'paragraph',
          text: 'Boulevard Haussmann, between department stores and Parisian bustle, hides a treasure: Les Caves Augé. Founded in 1850, it\'s the oldest wine cellar in Paris still in operation. And probably one of the best.'
        },
        {
          type: 'image',
          src: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=1200&h=800&auto=format&fit=crop',
          alt: 'Wine tasting',
          caption: 'An impromptu tasting, as only Les Caves Augé knows how to do'
        },
        {
          type: 'heading',
          text: 'A natural wine pioneer'
        },
        {
          type: 'paragraph',
          text: 'Long before natural wine became trendy, Les Caves Augé was already defending independent winemakers and respectful methods. Marc Sibard, the owner, was one of the first in Paris to believe in this quiet revolution.'
        },
        {
          type: 'paragraph',
          text: 'Pushing open the door of this cellar is entering another world. Bottles pile from floor to ceiling, labels tell stories, and advice is always personalized.'
        },
        {
          type: 'quote',
          text: 'Natural wine is first and foremost a story of trust between the winemaker and the land.',
          author: 'Marc Sibard'
        },
        {
          type: 'heading',
          text: 'My discoveries of the day'
        },
        {
          type: 'paragraph',
          text: 'During my last visit, Marc introduced me to three gems I would never have found on my own:'
        },
        {
          type: 'list',
          items: [
            'A Gamay from Jean-Claude Lapalu, fruity and digestible',
            'A Chenin from the Loire, mineral and taut',
            'A Poulsard from Jura, light as a feather'
          ]
        },
        {
          type: 'paragraph',
          text: 'What I love about Les Caves Augé is the absence of snobbery. You can come with a €12 or €200 budget, you\'ll be welcomed with the same passion. Wine isn\'t a luxury product here, it\'s an art of living.'
        },
        {
          type: 'heading',
          text: 'Practical information'
        },
        {
          type: 'paragraph',
          text: 'Les Caves Augé, 116 Boulevard Haussmann, 75008 Paris. Open Tuesday to Saturday. Free tastings every Saturday afternoon. A tip: come with time, you never leave with just one bottle.'
        }
      ]
    }
  }
]

// Guides data
export const guides = [
  {
    id: 1,
    slug: 'paris',
    city: 'Paris',
    title: { fr: 'Le Guide Paris', en: 'The Paris Guide' },
    subtitle: { fr: 'Mes 50 adresses incontournables', en: 'My 50 must-visit spots' },
    description: {
      fr: 'Cafés cachés, tables d\'exception, caves à vin secrètes. Tout ce que j\'ai découvert en 5 ans de vie parisienne.',
      en: 'Hidden cafés, exceptional tables, secret wine cellars. Everything I\'ve discovered in 5 years of Parisian life.'
    },
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&auto=format&fit=crop',
    places: 50,
    available: true
  },
  {
    id: 2,
    slug: 'dublin',
    city: 'Dublin',
    title: { fr: 'Le Guide Dublin', en: 'The Dublin Guide' },
    subtitle: { fr: 'Le meilleur de la capitale irlandaise', en: 'The best of the Irish capital' },
    description: {
      fr: 'Pubs authentiques, brunchs parfaits, et la scène café émergente. Dublin comme vous ne l\'avez jamais vue.',
      en: 'Authentic pubs, perfect brunches, and the emerging coffee scene. Dublin like you\'ve never seen it.'
    },
    image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=1200&h=800&auto=format&fit=crop',
    places: 35,
    available: true
  },
  {
    id: 3,
    slug: 'london',
    city: 'London',
    title: { fr: 'Le Guide London', en: 'The London Guide' },
    subtitle: { fr: 'La scène food londonienne', en: 'The London food scene' },
    description: {
      fr: 'Borough Market, Soho, Shoreditch. Les quartiers qui font vibrer la gastronomie londonienne.',
      en: 'Borough Market, Soho, Shoreditch. The neighborhoods that make London\'s food scene vibrant.'
    },
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&auto=format&fit=crop',
    places: 40,
    available: false
  },
  {
    id: 4,
    slug: 'osaka',
    city: 'Osaka',
    title: { fr: 'Le Guide Osaka', en: 'The Osaka Guide' },
    subtitle: { fr: 'La capitale japonaise de la street food', en: 'Japan\'s street food capital' },
    description: {
      fr: 'Takoyaki, okonomiyaki, kissaten. Un voyage culinaire au cœur du Kansai.',
      en: 'Takoyaki, okonomiyaki, kissaten. A culinary journey to the heart of Kansai.'
    },
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&auto=format&fit=crop',
    places: 30,
    available: false
  }
]

// Helper functions
export const getArticleBySlug = (slug) => articles.find(a => a.slug === slug)
export const getArticlesByCategory = (category) => articles.filter(a => a.category === category)
export const getFeaturedArticles = () => articles.filter(a => a.featured)
export const getGuideBySlug = (slug) => guides.find(g => g.slug === slug)
