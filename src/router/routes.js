const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/account",
        name: "account",
        component: () => import("pages/AccountPage.vue"),
      },
      {
        path: "/event/:id",
        name: "event",
        component: () => import("pages/EventsPage.vue"),
      },
      {
        path: "/form",
        component: () => import("pages/AddEvent.vue"),
      },
      {
        path: "/add-event/:id/edit",
        name: "add-event",
        component: () => import("pages/AddEvent.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
