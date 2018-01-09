routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/user-form/',
    url: './pages/user-form.html',
  },
  {
    path: '/cleaner-form/',
    url: './pages/cleaner-form.html',
  },
  {
    path: '/cleaner-code/',
    url: './pages/cleaner-code.html',
  },
  {
    path: '/manager-code/',
    url: './pages/manager-code.html',
  },
  {
    path: '/manager-rating/',
    url: './pages/manager-rating.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
