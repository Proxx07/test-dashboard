# ABLE-ID Dashboard

Clone repo with command

<code>
git clone https://gitlab.itc.local/ableid/ableid-dashboard.git
</code>

<code>npm i</code> for dependencies installation

<code>npm run build:prod</code> for building production version of app

<code>npm run build:dev</code> for building development version of app

Difference between prod and dev versions in backend API

Recommended Node version is <code>18.18.0</code>

### Project structure and info
    ├── /dist               # Compiled files
    ├── /public             # Assets of project avialable via link
    ├── /src                # Source files
        ├── /api        
        ├── /assets         # Assets of project avialavble only inside project
        ├── /componets      # Reusable components
        ├── /composables    # Composables  
        ├── /layouts        # Page layouts
        ├── /middlewares    # Middlewares
        ├── /models         # Reusable types, interfaces, static content e.t.c
        ├── /pages          # Pages of project
        ├── /plugins        # Plugins
        ├── /router         # Router
        ├── /stores         # Store
        ├── /styles         # Styles
        ├── /utils          # Shared helpers, utility functions e.t.c
        ├── App.vue         # Application component
        ├── main.ts         # Entry point
    ├── index.html          # Main HTML file
    ├── package.json        # Version control file
    ├── tsconfig.json       # TypeScript configurations
    ├── tsconfig.node.json  # TypeScript configurations
    ├── vite.config.json    # Bundler configurations

    ├── /api
        ├── /mockData       # Mock data for main dashboard
        ├── axios.ts        # Instance of axios for requests

    ├── /componets                  
        ├── /charts                 # Сomponents for graphics
            ├── VChart.vue          # Main component for all charts
        ├── ConfirmationModal.vue   # Component for custom confirmation plugin
        ├── PageTopPart.vue         # Top part of all pages
    
    ├── /composables
        ├── /charts                 # VChart component's composables
        ├── useAbortController.ts   # Composable for request cancel when page unmounted
    
    ├── /layouts                    # Wrappeers for pages working with routes an layoutMiddleware
        ├── AppLayout.vue
        ├── Default.vue
        ├── Guest.vue

    ├── /middlewares
        ├── checkUserRole.ts        # Middleware for checking user's permissions to the project.
                                      Working with router, routes and src/utils/roles.ts
    
    ├── /pages
        ├── DashboardTest.vue       # Usage expamples of all possible graphics in project

    ├── /plugins
        ├── ConfirmationPlugin.ts   # Custom plugin for awaiting confirmation to continue script running
        ├── cookies.ts              # Custom plugin for cookies
        ├── toasts.ts               # Toasts plugin
        ├── VIntersection.ts        # Custom directive for lazy-loading. Usage example on Users page
    
    ├── stores      # Global store of project. Using Pinia

Apex-charts documentation https://apexcharts.com/vue-chart-demos/
<br>
Pinia documentation https://pinia.vuejs.org/
<br>
Toastifications plugin https://vue3-toastify.js-bridge.com/get-started/introduction.html

## Recommended IDE Setup
- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).