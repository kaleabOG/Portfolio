# Jackson - Personal Portfolio Website

A modern, fully responsive personal portfolio website built with HTML, CSS, and JavaScript. Features a dark theme, smooth animations, and a working contact form.

## Features

- ✨ **Modern Dark Theme** with light mode toggle
- 📱 **Fully Responsive** design for all devices
- 🎯 **Smooth Scrolling** navigation
- 🎨 **Beautiful Animations** on scroll
- 📧 **Working Contact Form** with EmailJS integration
- 🎭 **Project Filtering** system
- 📊 **Animated Skill Bars**
- 🎬 **Hero Carousel** navigation

## Sections

1. **Hero** - Eye-catching introduction with gradient text
2. **About** - Personal information and statistics
3. **Skills** - Animated skill bars with percentages
4. **Projects** - Filterable project gallery
5. **Experience** - Timeline of work experience
6. **Contact** - Working contact form
7. **Footer** - Social links and copyright

## Setup Instructions

### 1. Basic Setup

Simply open `index.html` in your web browser. No build process required!

### 2. EmailJS Configuration (For Contact Form)

The contact form uses EmailJS to send emails. Follow these steps:

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create an Email Service**
   - Go to "Email Services" in your dashboard
   - Add a new service (Gmail, Outlook, etc.)
   - Note your **Service ID**

3. **Create an Email Template**
   - Go to "Email Templates"
   - Create a new template
   - Use these template variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message
   - Note your **Template ID**

4. **Get Your Public Key**
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Update script.js**
   - Open `script.js`
   - Replace the placeholder values at the top:
     ```javascript
     const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
     const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
     const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
     ```
   - Replace with your actual credentials

### 3. Customization

#### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --accent-primary: #ff6b6b;
    --accent-secondary: #ff8e8e;
    --gradient-start: #ff6b6b;
    --gradient-end: #ff8e8e;
}
```

#### Content
- Update personal information in `index.html`
- Replace placeholder images with your own
- Modify project cards, skills, and experience entries

#### Hero Content
Edit the `heroContents` array in `script.js` to customize hero carousel content.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## File Structure

```
prot/
├── index.html      # Main HTML structure
├── style.css       # All styles and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Features Explained

### Dark Mode Toggle
- Click the theme toggle button in the navigation
- Preference is saved to localStorage
- Automatically applies on page load

### Smooth Scrolling
- All navigation links use smooth scrolling
- Automatically accounts for fixed navbar height

### Project Filtering
- Click filter buttons to show/hide projects by category
- Smooth fade animations on filter change

### Skill Bar Animation
- Skill bars animate when scrolled into view
- Uses Intersection Observer API for performance

### Contact Form
- Validates all required fields
- Shows success/error messages
- Integrates with EmailJS for email delivery

## Notes

- The contact form will not work until EmailJS credentials are configured
- All images are placeholder gradients - replace with your own images
- The hero section uses CSS gradients as background - replace with your own image if desired

## License

Free to use for personal and commercial projects.

---

**Enjoy your new portfolio website! 🚀**
