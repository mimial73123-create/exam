# LeadPredictor - Sales Forecast Calculator

A modern, interactive calculator for forecasting sales performance and lead conversion rates over a campaign period.

## Features

- **Campaign Configuration**: Set custom campaign dates and budget parameters
- **Interactive Chart**: Real-time visualization of monthly prospects, leads, and customers
- **Response Rate Sliders**: Adjust lead and prospect conversion rates with instant feedback
- **KPI Metrics**: Track prospects, leads, and customers with conversion percentages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Modern, professional dark interface

## Formulas Used

### Formula 01: Calculate Required Customers
```
Customers = Total Revenue / Average Order Value
```

### Formula 02: Calculate Required Leads
```
Leads = Customers * 100 / Lead Response Rate (%)
```

### Formula 03: Calculate Required Prospects
```
Prospects = Leads * 100 / Prospect Response Rate (%)
```

## File Structure

```
├── index.html          # Main HTML structure
├── index.css           # Styling and responsive design
├── index.js            # JavaScript logic and calculations
├── LeadPredictor.html   # Legacy all-in-one version
└── README.md           # This file
```

## How to Use

1. **Set Campaign Parameters**
   - Choose campaign start and end dates
   - Enter total revenue target
   - Define average order value

2. **Configure Response Rates**
   - Adjust "Lead Response Rate" slider (0-100%)
   - Adjust "Prospect Response Rate" slider (0-100%)

3. **Monitor Metrics**
   - View total prospects, leads, and customers
   - Check conversion percentages
   - Analyze monthly trends in the chart

4. **Interpret the Chart**
   - Stacked bars show monthly breakdown
   - Hover over bars to see detailed numbers
   - Colors represent different conversion stages

## Installation & Deployment

### Local Testing
```bash
# Simply open index.html in a web browser
open index.html
```

### Deploy to Netlify
1. Push code to GitHub repository
2. Connect GitHub to Netlify
3. Select the main branch
4. Deploy automatically

## Technologies

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (Vanilla)**: No dependencies, pure JS

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Features Implemented

✅ Dynamic monthly forecast calculation  
✅ Three-stage conversion funnel (Prospects → Leads → Customers)  
✅ Interactive response rate adjustment  
✅ Real-time metric updates  
✅ Responsive grid layout  
✅ Hover tooltips on chart bars  
✅ Progress bars with conversion percentages  
✅ Professional dark theme  

## License

Free to use for educational and commercial purposes.

## Author

Created as an educational project for demonstrating sales forecasting calculations.
