// State
const state = {
    language: 'en',
    currency: 'usd',
    campaignStart: '2026-05-08',
    campaignEnd: '2026-11-04',
    totalRevenue: 10000,
    avgOrderValue: 1000,
    leadResponseRate: 40,
    prospectResponseRate: 20
};

// DOM Elements
const elements = {
    language: document.getElementById('language'),
    currency: document.getElementById('currency'),
    campaignStart: document.getElementById('campaignStart'),
    campaignEnd: document.getElementById('campaignEnd'),
    totalRevenue: document.getElementById('totalRevenue'),
    avgOrderValue: document.getElementById('avgOrderValue'),
    leadResponseRate: document.getElementById('leadResponseRate'),
    prospectResponseRate: document.getElementById('prospectResponseRate'),
    leadResponseDisplay: document.getElementById('leadResponseDisplay'),
    prospectResponseDisplay: document.getElementById('prospectResponseDisplay'),
    prospectsValue: document.getElementById('prospectsValue'),
    leadsValue: document.getElementById('leadsValue'),
    customersValue: document.getElementById('customersValue'),
    leadsPercentage: document.getElementById('leadsPercentage'),
    customersPercentage: document.getElementById('customersPercentage'),
    leadsBarFill: document.getElementById('leadsBarFill'),
    customersBarFill: document.getElementById('customersBarFill'),
    chart: document.getElementById('chart')
};

// Event Listeners
elements.language.addEventListener('change', (e) => {
    state.language = e.target.value;
});

elements.currency.addEventListener('change', (e) => {
    state.currency = e.target.value;
});

elements.campaignStart.addEventListener('change', (e) => {
    state.campaignStart = e.target.value;
    calculateAndUpdate();
});

elements.campaignEnd.addEventListener('change', (e) => {
    state.campaignEnd = e.target.value;
    calculateAndUpdate();
});

elements.totalRevenue.addEventListener('input', (e) => {
    state.totalRevenue = parseFloat(e.target.value) || 0;
    calculateAndUpdate();
});

elements.avgOrderValue.addEventListener('input', (e) => {
    state.avgOrderValue = parseFloat(e.target.value) || 1;
    calculateAndUpdate();
});

elements.leadResponseRate.addEventListener('input', (e) => {
    state.leadResponseRate = parseFloat(e.target.value);
    elements.leadResponseDisplay.textContent = state.leadResponseRate.toFixed(2) + '%';
    calculateAndUpdate();
});

elements.prospectResponseRate.addEventListener('input', (e) => {
    state.prospectResponseRate = parseFloat(e.target.value);
    elements.prospectResponseDisplay.textContent = state.prospectResponseRate.toFixed(2) + '%';
    calculateAndUpdate();
});

// Calculate funnel
function calculateAndUpdate() {
    const prospects = 125; // Fixed value from screenshot
    const leads = Math.round(prospects * (state.leadResponseRate / 100));
    const customers = Math.round(leads * (state.prospectResponseRate / 100));
    
    // Update metrics
    elements.prospectsValue.textContent = prospects;
    elements.leadsValue.textContent = leads;
    elements.customersValue.textContent = customers;
    
    const leadsPercent = Math.round((leads / prospects) * 100);
    const customersPercent = Math.round((customers / prospects) * 100);
    
    elements.leadsPercentage.textContent = leadsPercent + '%';
    elements.customersPercentage.textContent = customersPercent + '%';
    
    elements.leadsBarFill.style.width = leadsPercent + '%';
    elements.customersBarFill.style.width = customersPercent + '%';
    
    // Update chart
    updateChart(prospects, leads, customers);
}

// Draw chart with modern design
function updateChart(prospects, leads, customers) {
    const svg = elements.chart;
    svg.innerHTML = '';
    
    // Chart dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 50, bottom: 60, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Create defs for gradients
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Gradient for prospects
    const prospectGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    prospectGradient.setAttribute('id', 'prospectGradient');
    prospectGradient.setAttribute('x1', '0%');
    prospectGradient.setAttribute('y1', '0%');
    prospectGradient.setAttribute('x2', '0%');
    prospectGradient.setAttribute('y2', '100%');
    const prospectStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    prospectStop1.setAttribute('offset', '0%');
    prospectStop1.setAttribute('stop-color', '#4a7c9e');
    const prospectStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    prospectStop2.setAttribute('offset', '100%');
    prospectStop2.setAttribute('stop-color', '#2a4c6e');
    prospectGradient.appendChild(prospectStop1);
    prospectGradient.appendChild(prospectStop2);
    
    // Gradient for leads
    const leadsGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    leadsGradient.setAttribute('id', 'leadsGradient');
    leadsGradient.setAttribute('x1', '0%');
    leadsGradient.setAttribute('y1', '0%');
    leadsGradient.setAttribute('x2', '0%');
    leadsGradient.setAttribute('y2', '100%');
    const leadsStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    leadsStop1.setAttribute('offset', '0%');
    leadsStop1.setAttribute('stop-color', '#00d4ff');
    const leadsStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    leadsStop2.setAttribute('offset', '100%');
    leadsStop2.setAttribute('stop-color', '#0099ff');
    leadsGradient.appendChild(leadsStop1);
    leadsGradient.appendChild(leadsStop2);
    
    // Gradient for customers
    const customersGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    customersGradient.setAttribute('id', 'customersGradient');
    customersGradient.setAttribute('x1', '0%');
    customersGradient.setAttribute('y1', '0%');
    customersGradient.setAttribute('x2', '0%');
    customersGradient.setAttribute('y2', '100%');
    const customersStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    customersStop1.setAttribute('offset', '0%');
    customersStop1.setAttribute('stop-color', '#00ffff');
    const customersStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    customersStop2.setAttribute('offset', '100%');
    customersStop2.setAttribute('stop-color', '#0080ff');
    customersGradient.appendChild(customersStop1);
    customersGradient.appendChild(customersStop2);
    
    // Filter for glow effect
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'glow');
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '3');
    feGaussianBlur.setAttribute('result', 'coloredBlur');
    filter.appendChild(feGaussianBlur);
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'coloredBlur');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feMerge);
    
    defs.appendChild(prospectGradient);
    defs.appendChild(leadsGradient);
    defs.appendChild(customersGradient);
    defs.appendChild(filter);
    svg.appendChild(defs);
    
    // Months data
    const monthsCount = 6;
    const months = [];
    let currentDate = new Date(state.campaignStart);
    const endDate = new Date(state.campaignEnd);
    
    for (let i = 0; currentDate <= endDate && i < 12; i++) {
        months.push({
            month: i + 1,
            name: currentDate.toLocaleDateString('en-US', { month: 'short' }),
            prospects,
            leads,
            customers
        });
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    // Scale data
    const maxValue = Math.max(...months.map(m => m.prospects)) * 1.15;
    const barWidth = (chartWidth / (months.length * 1.2)) / 3;
    const barSpacing = chartWidth / months.length;
    
    // Draw background grid
    for (let i = 1; i < 5; i++) {
        const y = margin.top + (chartHeight / 5) * i;
        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine.setAttribute('x1', margin.left);
        gridLine.setAttribute('x2', width - margin.right);
        gridLine.setAttribute('y1', y);
        gridLine.setAttribute('y2', y);
        gridLine.setAttribute('stroke', 'rgba(0, 212, 255, 0.08)');
        gridLine.setAttribute('stroke-width', '1');
        gridLine.setAttribute('stroke-dasharray', '4,4');
        svg.appendChild(gridLine);
    }
    
    // Draw grid labels
    for (let i = 0; i <= 5; i++) {
        const y = margin.top + (chartHeight / 5) * i;
        const value = Math.round(maxValue - (maxValue / 5) * i);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', margin.left - 12);
        text.setAttribute('y', y + 5);
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('font-size', '12');
        text.setAttribute('fill', '#7a9aff');
        text.setAttribute('font-weight', '500');
        text.textContent = value;
        svg.appendChild(text);
    }
    
    // Draw bars with shadows
    months.forEach((data, index) => {
        const baseX = margin.left + barSpacing * index + (barSpacing - barWidth * 3.2) / 2;
        
        // Shadow effect
        [0, 1, 2].forEach(offset => {
            const shadowRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            shadowRect.setAttribute('x', baseX + barWidth * offset);
            shadowRect.setAttribute('y', margin.top + chartHeight + 2);
            shadowRect.setAttribute('width', barWidth);
            shadowRect.setAttribute('height', '3');
            shadowRect.setAttribute('fill', 'rgba(0, 0, 0, 0.2)');
            shadowRect.setAttribute('rx', '2');
            svg.appendChild(shadowRect);
        });
        
        // Prospects bar
        const prospectHeight = (data.prospects / maxValue) * chartHeight;
        const prospectBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        prospectBar.setAttribute('x', baseX);
        prospectBar.setAttribute('y', margin.top + chartHeight - prospectHeight);
        prospectBar.setAttribute('width', barWidth);
        prospectBar.setAttribute('height', prospectHeight);
        prospectBar.setAttribute('fill', 'url(#prospectGradient)');
        prospectBar.setAttribute('rx', '4');
        prospectBar.setAttribute('filter', 'url(#glow)');
        prospectBar.setAttribute('opacity', '0.9');
        svg.appendChild(prospectBar);
        
        // Leads bar
        const leadsHeight = (data.leads / maxValue) * chartHeight;
        const leadsBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        leadsBar.setAttribute('x', baseX + barWidth + 2);
        leadsBar.setAttribute('y', margin.top + chartHeight - leadsHeight);
        leadsBar.setAttribute('width', barWidth);
        leadsBar.setAttribute('height', leadsHeight);
        leadsBar.setAttribute('fill', 'url(#leadsGradient)');
        leadsBar.setAttribute('rx', '4');
        leadsBar.setAttribute('filter', 'url(#glow)');
        svg.appendChild(leadsBar);
        
        // Customers bar
        const customersHeight = (data.customers / maxValue) * chartHeight;
        const customersBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        customersBar.setAttribute('x', baseX + barWidth * 2 + 4);
        customersBar.setAttribute('y', margin.top + chartHeight - customersHeight);
        customersBar.setAttribute('width', barWidth);
        customersBar.setAttribute('height', customersHeight);
        customersBar.setAttribute('fill', 'url(#customersGradient)');
        customersBar.setAttribute('rx', '4');
        customersBar.setAttribute('filter', 'url(#glow)');
        svg.appendChild(customersBar);
        
        // Month label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', baseX + barWidth * 1.5 + 2);
        label.setAttribute('y', margin.top + chartHeight + 28);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '13');
        label.setAttribute('fill', '#64d4ff');
        label.setAttribute('font-weight', '600');
        label.textContent = data.month;
        svg.appendChild(label);
    });
    
    // Draw axes
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', margin.left);
    xAxis.setAttribute('x2', width - margin.right);
    xAxis.setAttribute('y1', margin.top + chartHeight);
    xAxis.setAttribute('y2', margin.top + chartHeight);
    xAxis.setAttribute('stroke', 'rgba(0, 212, 255, 0.3)');
    xAxis.setAttribute('stroke-width', '2');
    svg.appendChild(xAxis);
    
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', margin.left);
    yAxis.setAttribute('x2', margin.left);
    yAxis.setAttribute('y1', margin.top);
    yAxis.setAttribute('y2', margin.top + chartHeight);
    yAxis.setAttribute('stroke', 'rgba(0, 212, 255, 0.3)');
    yAxis.setAttribute('stroke-width', '2');
    svg.appendChild(yAxis);
    
    // Y-axis label
    const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yLabel.setAttribute('transform', 'rotate(-90)');
    yLabel.setAttribute('y', 0 - margin.left + 18);
    yLabel.setAttribute('x', 0 - (margin.top + chartHeight / 2));
    yLabel.setAttribute('text-anchor', 'middle');
    yLabel.setAttribute('font-size', '12');
    yLabel.setAttribute('fill', '#7a9aff');
    yLabel.setAttribute('font-weight', '600');
    yLabel.textContent = 'People';
    svg.appendChild(yLabel);
}

// Initialize
calculateAndUpdate();
