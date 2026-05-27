// State management
const state = {
    launchingCustomers: 100,
    customerGrowthRate: 10,
    avgOrderValue: 50,
    leadResponseRate: 25,
    conversionRate: 15,
    variableCost: 15,
    fixedCost: 5000,
    churnRate: 5,
    monthlyData: []
};

// Get DOM elements
const elements = {
    launchingCustomers: document.getElementById('launchingCustomers'),
    customerGrowthRate: document.getElementById('customerGrowthRate'),
    avgOrderValue: document.getElementById('avgOrderValue'),
    leadResponseRate: document.getElementById('leadResponseRate'),
    conversionRate: document.getElementById('conversionRate'),
    variableCost: document.getElementById('variableCost'),
    fixedCost: document.getElementById('fixedCost'),
    churnRate: document.getElementById('churnRate'),
    
    growthRateDisplay: document.getElementById('growthRateDisplay'),
    leadRateDisplay: document.getElementById('leadRateDisplay'),
    conversionRateDisplay: document.getElementById('conversionRateDisplay'),
    churnRateDisplay: document.getElementById('churnRateDisplay'),
    
    totalCustomers: document.getElementById('totalCustomers'),
    totalCustomersChange: document.getElementById('totalCustomersChange'),
    totalOrders: document.getElementById('totalOrders'),
    totalOrdersChange: document.getElementById('totalOrdersChange'),
    totalRevenue: document.getElementById('totalRevenue'),
    totalRevenueChange: document.getElementById('totalRevenueChange'),
    totalCosts: document.getElementById('totalCosts'),
    totalCostsChange: document.getElementById('totalCostsChange'),
    netProfit: document.getElementById('netProfit'),
    netProfitChange: document.getElementById('netProfitChange'),
    profitMargin: document.getElementById('profitMargin'),
    profitMarginChange: document.getElementById('profitMarginChange'),
    
    kpiAcquisition: document.getElementById('kpiAcquisition'),
    kpiGrowth: document.getElementById('kpiGrowth'),
    kpiRevenuePerCustomer: document.getElementById('kpiRevenuePerCustomer'),
    kpiFulfillment: document.getElementById('kpiFulfillment'),
    kpiCostPerOrder: document.getElementById('kpiCostPerOrder'),
    kpiHealth: document.getElementById('kpiHealth'),
    
    kpiAcquisitionBar: document.getElementById('kpiAcquisitionBar'),
    kpiGrowthBar: document.getElementById('kpiGrowthBar'),
    kpiRevenuePerCustomerBar: document.getElementById('kpiRevenuePerCustomerBar'),
    kpiFulfillmentBar: document.getElementById('kpiFulfillmentBar'),
    kpiCostPerOrderBar: document.getElementById('kpiCostPerOrderBar'),
    kpiHealthBar: document.getElementById('kpiHealthBar'),
    
    breakEvenValue: document.getElementById('breakEvenValue'),
    roiValue: document.getElementById('roiValue'),
    paybackValue: document.getElementById('paybackValue'),
    
    revenueChart: document.getElementById('revenueChart'),
    monthlyDataContainer: document.getElementById('monthlyDataContainer')
};

// Calculate monthly data
function calculateMonthlyData() {
    state.monthlyData = [];
    let customers = state.launchingCustomers;
    let totalOrders = 0;
    let totalRevenue = 0;
    let totalCosts = 0;

    for (let month = 1; month <= 12; month++) {
        // Apply churn
        customers = Math.floor(customers * (1 - state.churnRate / 100));
        
        // Add growth
        const newCustomers = Math.floor(customers * (state.customerGrowthRate / 100));
        customers = customers + newCustomers;

        // Calculate orders (leads × conversion rate)
        const leads = Math.floor(customers * (state.leadResponseRate / 100));
        const orders = Math.floor(leads * (state.conversionRate / 100));
        const monthRevenue = orders * state.avgOrderValue;
        const monthCosts = (orders * state.variableCost) + state.fixedCost;
        const monthProfit = monthRevenue - monthCosts;

        totalOrders += orders;
        totalRevenue += monthRevenue;
        totalCosts += monthCosts;

        state.monthlyData.push({
            month,
            customers: Math.max(0, customers),
            leads,
            orders,
            revenue: monthRevenue,
            costs: monthCosts,
            profit: monthProfit
        });
    }

    return { totalOrders, totalRevenue, totalCosts };
}

// Update display values
function updateDisplayValues() {
    elements.growthRateDisplay.textContent = state.customerGrowthRate.toFixed(1) + '%';
    elements.leadRateDisplay.textContent = state.leadResponseRate.toFixed(1) + '%';
    elements.conversionRateDisplay.textContent = state.conversionRate.toFixed(1) + '%';
    elements.churnRateDisplay.textContent = state.churnRate.toFixed(1) + '%';
}

// Update metrics
function updateMetrics() {
    const { totalOrders, totalRevenue, totalCosts } = calculateMonthlyData();
    
    const finalMonthCustomers = state.monthlyData[11]?.customers || state.launchingCustomers;
    const netProfit = totalRevenue - totalCosts;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    // Update totals
    elements.totalCustomers.textContent = Math.floor(finalMonthCustomers);
    elements.totalCustomersChange.textContent = `+${Math.floor(finalMonthCustomers - state.launchingCustomers)}`;
    
    elements.totalOrders.textContent = totalOrders;
    elements.totalOrdersChange.textContent = totalOrders > 0 ? `+${totalOrders}` : '0';
    
    elements.totalRevenue.textContent = '$' + formatNumber(totalRevenue);
    elements.totalRevenueChange.textContent = '$' + formatNumber(totalRevenue);
    
    elements.totalCosts.textContent = '$' + formatNumber(totalCosts);
    elements.totalCostsChange.textContent = '$' + formatNumber(totalCosts);
    
    elements.netProfit.textContent = '$' + formatNumber(netProfit);
    elements.netProfitChange.textContent = netProfit >= 0 ? '+' + formatNumber(netProfit) : formatNumber(netProfit);
    
    elements.profitMargin.textContent = profitMargin.toFixed(1) + '%';
    elements.profitMarginChange.textContent = profitMargin.toFixed(1) + '%';

    // Update KPIs
    const monthlyGrowth = state.customerGrowthRate - state.churnRate;
    elements.kpiAcquisition.textContent = `+${Math.floor(finalMonthCustomers * state.customerGrowthRate / 100)}/month`;
    elements.kpiGrowth.textContent = `${monthlyGrowth.toFixed(1)}%`;
    elements.kpiRevenuePerCustomer.textContent = '$' + (finalMonthCustomers > 0 ? (totalRevenue / finalMonthCustomers).toFixed(2) : '0.00');
    elements.kpiFulfillment.textContent = totalOrders;
    elements.kpiCostPerOrder.textContent = '$' + (totalOrders > 0 ? (totalCosts / totalOrders).toFixed(2) : '0.00');

    // Health status
    let health = 'Poor';
    let healthColor = '#ff6b6b';
    if (profitMargin > 50) {
        health = 'Excellent';
        healthColor = '#00ffaa';
    } else if (profitMargin > 30) {
        health = 'Good';
        healthColor = '#00d4ff';
    } else if (profitMargin > 0) {
        health = 'Fair';
        healthColor = '#ffaa00';
    }
    elements.kpiHealth.textContent = health;
    elements.kpiHealthBar.style.background = healthColor;
    elements.kpiHealthBar.style.width = Math.max(10, Math.min(100, profitMargin)) + '%';

    // Update bars
    elements.kpiAcquisitionBar.style.width = Math.min(100, (monthlyGrowth / 30) * 100) + '%';
    elements.kpiGrowthBar.style.width = Math.min(100, (monthlyGrowth / 20) * 100) + '%';
    elements.kpiRevenuePerCustomerBar.style.width = Math.min(100, (totalRevenue / finalMonthCustomers / 500) * 100) + '%';
    elements.kpiFulfillmentBar.style.width = Math.min(100, (totalOrders / 1000) * 100) + '%';
    elements.kpiCostPerOrderBar.style.width = Math.min(100, ((totalCosts / totalOrders || 0) / 100) * 100) + '%';

    // Scenario analysis
    const breakEvenMonth = state.monthlyData.find(m => m.profit > 0);
    elements.breakEvenValue.textContent = breakEvenMonth ? `Month ${breakEvenMonth.month}` : 'Not reached';
    
    const roi = totalRevenue > 0 ? ((netProfit / (state.fixedCost * 12)) * 100) : 0;
    elements.roiValue.textContent = roi.toFixed(1) + '%';
    
    // Render chart
    renderChart();
    renderMonthlyTable();
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num).toString();
}

// Render revenue chart
function renderChart() {
    elements.revenueChart.innerHTML = '';
    const maxRevenue = Math.max(...state.monthlyData.map(m => m.revenue), 1);
    const chartHeight = 200;

    state.monthlyData.forEach((data, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar-group';
        
        const revenueHeight = (data.revenue / maxRevenue) * chartHeight;
        const profitHeight = (Math.max(0, data.profit) / maxRevenue) * chartHeight;
        
        const revenueBar = document.createElement('div');
        revenueBar.className = 'chart-bar revenue-bar';
        revenueBar.style.height = revenueHeight + 'px';
        revenueBar.title = `Month ${data.month}: $${data.revenue}`;
        
        const profitBar = document.createElement('div');
        profitBar.className = 'chart-bar profit-bar';
        profitBar.style.height = Math.max(2, profitHeight) + 'px';
        profitBar.style.background = data.profit > 0 ? 'linear-gradient(135deg, #00ffaa, #00cc88)' : 'linear-gradient(135deg, #ff6b6b, #ee5a6f)';
        profitBar.title = `Month ${data.month}: $${data.profit}`;
        
        bar.appendChild(revenueBar);
        bar.appendChild(profitBar);
        
        const label = document.createElement('div');
        label.className = 'chart-label';
        label.textContent = 'M' + data.month;
        bar.appendChild(label);
        
        elements.revenueChart.appendChild(bar);
    });
}

// Render monthly data table
function renderMonthlyTable() {
    elements.monthlyDataContainer.innerHTML = '';
    state.monthlyData.forEach(data => {
        const row = document.createElement('div');
        row.className = 'breakdown-row';
        row.innerHTML = `
            <div>${data.month}</div>
            <div>${Math.floor(data.customers)}</div>
            <div>${data.orders}</div>
            <div>$${formatNumber(data.revenue)}</div>
            <div>$${formatNumber(data.costs)}</div>
            <div class="${data.profit >= 0 ? 'profit' : 'loss'}">$${formatNumber(data.profit)}</div>
        `;
        elements.monthlyDataContainer.appendChild(row);
    });
}

// Event listeners
elements.launchingCustomers.addEventListener('input', (e) => {
    state.launchingCustomers = parseInt(e.target.value) || 1;
    updateMetrics();
});

elements.customerGrowthRate.addEventListener('input', (e) => {
    state.customerGrowthRate = parseFloat(e.target.value);
    updateDisplayValues();
    updateMetrics();
});

elements.avgOrderValue.addEventListener('input', (e) => {
    state.avgOrderValue = parseFloat(e.target.value) || 1;
    updateMetrics();
});

elements.leadResponseRate.addEventListener('input', (e) => {
    state.leadResponseRate = parseFloat(e.target.value);
    updateDisplayValues();
    updateMetrics();
});

elements.conversionRate.addEventListener('input', (e) => {
    state.conversionRate = parseFloat(e.target.value);
    updateDisplayValues();
    updateMetrics();
});

elements.variableCost.addEventListener('input', (e) => {
    state.variableCost = parseFloat(e.target.value) || 0;
    updateMetrics();
});

elements.fixedCost.addEventListener('input', (e) => {
    state.fixedCost = parseFloat(e.target.value) || 0;
    updateMetrics();
});

elements.churnRate.addEventListener('input', (e) => {
    state.churnRate = parseFloat(e.target.value);
    updateDisplayValues();
    updateMetrics();
});

// Initial calculation
updateDisplayValues();
updateMetrics();
