const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home.js');
const dashboardRoutes = require('./dashboard.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).send('404: Page not found');
});

module.export = router;