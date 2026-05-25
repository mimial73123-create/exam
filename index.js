// Data and calculation logic
const state = {
    startDate: new Date('2026-05-08'),
    endDate: new Date('2026-11-04'),
    totalRevenue: 10000,
    avgOrderValue: 1000,
    leadResponseRate: 40,
    prospectResponseRate: 20,
    monthlyData: []
};

// Get form elements
const elements = {
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    totalRevenue: document.getElementById('totalRevenue'),
    avgOrderValue: document.getElementById('avgOrderValue'),
    leadResponseRate: document.getElementById('leadResponseRate'),
    prospectResponseRate: document.getElementById('prospectResponseRate'),
    leadRateValue: document.getElementById('leadRateValue'),
    prospectRateValue: document.getElementById('prospectRateValue'),
    prospectsValue: document.getElementById('prospectsValue'),
    leadsValue: document.getElementById('leadsValue'),
    customersValue: document.getElementById('customersValue'),
    prospectsPercent: document.getElementById('prospectsPercent'),
    leadsPercent: document.getElementById('leadsPercent'),
    customersPercent: document.getElementById('customersPercent'),
    prospectsProgressFill: document.getElementById('prospectsProgressFill'),
    leadsProgressFill: document.getElementById('leadsProgressFill'),
    customersProgressFill: document.getElementById('customersProgressFill'),
    chart: document.getElementById('chart'),
    tooltip: document.getElementById('tooltip')
};

// Calculate number of months between two dates
function getMonthsBetween(d1, d2) {
    return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()) + 1;
}

// Formula 01: Calculate customers needed
// Customers = Total Revenue / Average Order Value
function calculateCustomers(revenue, avgValue) {
    return Math.round(revenue / avgValue);
}

// Formula 02: Calculate leads needed
// Leads = Customers * 100 / Lead Response Rate
function calculateLeads(customers, responseRate) {
    return Math.round((customers * 100) / responseRate);
}

// Formula 03: Calculate prospects needed
// Prospects = Leads * 100 / Prospect Response Rate
function calculateProspects(leads, responseRate) {
    return Math.round((leads * 100) / responseRate);
}

// Calculate monthly forecast data
function calculateForecast() {
    const months = getMonthsBetween(state.startDate, state.endDate);
    const monthlyRevenue = state.totalRevenue / months;

    state.monthlyData = [];

    for (let i = 0; i < months; i++) {
        // Growth factor (increases over time)
        const growthFactor = 0.7 + (i / months) * 0.9;
        
        const monthRevenue = monthlyRevenue * growthFactor;
        const customers = calculateCustomers(monthRevenue, state.avgOrderValue);
        const leads = calculateLeads(customers, state.leadResponseRate);
        const prospects = calculateProspects(leads, state.prospectResponseRate);

        state.monthlyData.push({
            month: i + 1,
            prospects: Math.max(5, prospects),
            leads: Math.max(2, leads),
            customers: Math.max(1, customers)
        });
    }

    // Calculate totals
    const totalProspects = state.monthlyData.reduce((sum, m) => sum + m.prospects, 0);
    const totalLeads = state.monthlyData.reduce((sum, m) => sum + m.leads, 0);
    const totalCustomers = state.monthlyData.reduce((sum, m) => sum + m.customers, 0);

    // Update metrics
    elements.prospectsValue.textContent = totalProspects;
    elements.leadsValue.textContent = totalLeads;
    elements.customersValue.textContent = totalCustomers;

    const leadsPercent = Math.round((totalLeads / totalProspects) * 100);
    const customersPercent = Math.round((totalCustomers / totalLeads) * 100);

    elements.prospectsPercent.textContent = '100%';
    elements.leadsPercent.textContent = leadsPercent + '%';
    elements.customersPercent.textContent = customersPercent + '%';

    elements.leadsProgressFill.style.width = leadsPercent + '%';
    elements.customersProgressFill.style.width = customersPercent + '%';

    // Render chart
    renderChart();
}

// Render the chart
function renderChart() {
    elements.chart.innerHTML = '';
    
    if (state.monthlyData.length === 0) return;

    const maxValue = Math.max(...state.monthlyData.map(m => m.prospects + m.leads + m.customers));

    state.monthlyData.forEach(monthData => {
        const total = monthData.prospects + monthData.leads + monthData.customers;
        const prospectHeight = (monthData.prospects / maxValue) * 100;
        const leadsHeight = (monthData.leads / maxValue) * 100;
        const customersHeight = (monthData.customers / maxValue) * 100;

        const barDiv = document.createElement('div');
        barDiv.className = 'chart-bar';

        const barGroup = document.createElement('div');
        barGroup.className = 'bar-group';

        // Prospects bar
        const prospectBar = document.createElement('div');
        prospectBar.className = 'bar-segment prospects';
        prospectBar.style.height = prospectHeight + '%';
        prospectBar.addEventListener('mouseenter', () => showTooltip(monthData, event));
        prospectBar.addEventListener('mouseleave', hideTooltip);
        barGroup.appendChild(prospectBar);

        // Leads bar
        const leadsBar = document.createElement('div');
        leadsBar.className = 'bar-segment leads';
        leadsBar.style.height = leadsHeight + '%';
        leadsBar.addEventListener('mouseenter', () => showTooltip(monthData, event));
        leadsBar.addEventListener('mouseleave', hideTooltip);
        barGroup.appendChild(leadsBar);

        // Customers bar
        const customersBar = document.createElement('div');
        customersBar.className = 'bar-segment customers';
        customersBar.style.height = customersHeight + '%';
        customersBar.addEventListener('mouseenter', () => showTooltip(monthData, event));
        customersBar.addEventListener('mouseleave', hideTooltip);
        barGroup.appendChild(customersBar);

        barDiv.appendChild(barGroup);

        // Add label
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = 'Month #' + monthData.month;
        barDiv.appendChild(label);

        elements.chart.appendChild(barDiv);
    });
}

// Show tooltip
function showTooltip(monthData, event) {
    const tooltip = elements.tooltip;
    tooltip.innerHTML = `Month #${monthData.month}<br>Prospects: ${monthData.prospects}<br>Leads: ${monthData.leads}<br>Customers: ${monthData.customers}`;
    tooltip.classList.add('visible');
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY - 30 + 'px';
}

// Hide tooltip
function hideTooltip() {
    elements.tooltip.classList.remove('visible');
}

// Event listeners
elements.startDate.addEventListener('change', (e) => {
    state.startDate = new Date(e.target.value);
    calculateForecast();
});

elements.endDate.addEventListener('change', (e) => {
    state.endDate = new Date(e.target.value);
    calculateForecast();
});

elements.totalRevenue.addEventListener('input', (e) => {
    state.totalRevenue = parseFloat(e.target.value) || 0;
    calculateForecast();
});

elements.avgOrderValue.addEventListener('input', (e) => {
    state.avgOrderValue = parseFloat(e.target.value) || 1;
    calculateForecast();
});

elements.leadResponseRate.addEventListener('input', (e) => {
    state.leadResponseRate = parseFloat(e.target.value);
    elements.leadRateValue.textContent = state.leadResponseRate.toFixed(2) + '%';
    calculateForecast();
});

elements.prospectResponseRate.addEventListener('input', (e) => {
    state.prospectResponseRate = parseFloat(e.target.value);
    elements.prospectRateValue.textContent = state.prospectResponseRate.toFixed(2) + '%';
    calculateForecast();
});

// Initial calculation
calculateForecast();
#   F o r m u l a   I m p l e m e n t a t i o n :   P r o s p e c t s ,   L e a d s ,   C u s t o m e r s   c a l c u l a t i o n   f u n c t i o n s   a d d e d  
 / /   G r o w t h   f a c t o r   o p t i m i z a t i o n   f o r   m o r e   a c c u r a t e   f o r e c a s t i n g  
 / /   F i x e d   t o o l t i p   p o s i t i o n i n g   o n   c h a r t   h o v e r  
 