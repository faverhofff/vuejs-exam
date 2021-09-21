export default [
  {
    path: '/',
    name: 'Home',
    component: () => import(`@/views/home.vue`),
  },
  {
    path: '/:query_id',
    name: 'Query',
    component: () => import(`@/views/home.vue`),
  }  
];
