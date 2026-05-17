// --- Data Storage (Defaults) ---

const defaultAboutData = {
    bio: "A detail-oriented Data Analyst passionate about uncovering patterns and delivering actionable insights.\nProficient in Python, SQL, and data visualization tools like Power BI. I specialize in data cleaning, exploratory data analysis (EDA), and building interactive dashboards that drive data-informed decisions.\nEquipped with a strong analytical mindset and problem-solving skills to tackle complex business challenges.",
    education: {
        logo: "./images/Maharishi_University_of_Information_Technology_Logo_Ritesh_Bhanu.png",
        institution: "Maharishi University of Information Technology",
        degree: "Bachelor of Computer Applications [2022-2025]"
    },
    tools: [
        { name: "Python", icon: "fab fa-python" },
        { name: "SQL / Database", icon: "fas fa-database" },
        { name: "Microsoft Excel", icon: "fas fa-file-excel" },
        { name: "Power BI", icon: "fas fa-chart-pie" }
    ]
};

const defaultSkills = [
    { title: "Programming Languages", iconClass: "fas fa-code", iconColorClass: "text-blue-400", iconBgClass: "bg-blue-600/20", skills: ["Python", "SQL"] },
    { title: "Libraries", iconClass: "fas fa-cubes", iconColorClass: "text-purple-400", iconBgClass: "bg-purple-600/20", skills: ["NumPy", "Pandas", "Matplotlib"] },
    { title: "Database", iconClass: "fas fa-database", iconColorClass: "text-green-400", iconBgClass: "bg-green-600/20", skills: ["MySQL"] },
    { title: "Data & Visualization Tools", iconClass: "fas fa-chart-bar", iconColorClass: "text-yellow-400", iconBgClass: "bg-yellow-600/20", skills: ["Power BI", "Microsoft Excel", "Pivot Tables", "VLOOKUP", "Dashboards"] },
    { title: "Tools & Platforms", iconClass: "fas fa-tools", iconColorClass: "text-orange-400", iconBgClass: "bg-orange-600/20", skills: ["Git", "GitHub", "Jupyter Notebook", "VS Code"] },
    { title: "Core Skills", iconClass: "fas fa-brain", iconColorClass: "text-pink-400", iconBgClass: "bg-pink-600/20", skills: ["Data Cleaning", "Data Preprocessing", "EDA", "Data Visualization", "Dashboard Development", "Statistical Analysis", "Problem Solving"] },
    { title: "GIS Skills", iconClass: "fas fa-map-marked-alt", iconColorClass: "text-teal-400", iconBgClass: "bg-teal-600/20", skills: ["GeoJSON", "Shapefiles", "Geospatial Data", "Location Intelligence", "spatial analysis", "Data Validation", "QGIS | ArcGIS"] }
];

const defaultProjectsData = [
    {
        title: "Sales Data Analysis & Dashboard",
        gradient: "from-[#1a2744] to-[#0d1117]",
        mainIconBg: "bg-yellow-500/20",
        mainIcon: "fas fa-chart-line text-yellow-400",
        topTags: [
            { name: "Excel", style: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" },
            { name: "Power BI", style: "bg-blue-500/10 border-blue-500/30 text-blue-400" }
        ],
        bulletPoints: [
            "Cleaned and transformed raw sales data using Excel (removed duplicates, handled missing values)",
            "Performed analysis using Pivot Tables and advanced Excel functions (VLOOKUP, IF)",
            "Built interactive Excel dashboard to track KPIs: revenue, profit, and sales growth",
            "Developed Power BI dashboard with filters and slicers for dynamic visualization",
            "Identified top-performing products and region-wise sales performance"
        ],
        bottomTags: ["Pivot Tables", "VLOOKUP", "Power BI", "Dashboard"],
        githubLink: "https://github.com/sandeepmishraofficial"
    },
    {
        title: "Netflix Data Analysis",
        gradient: "from-[#2a0d0d] to-[#0d1117]",
        mainIconBg: "bg-red-500/20",
        mainIcon: "fas fa-film text-red-400",
        topTags: [
            { name: "Python", style: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
            { name: "SQL", style: "bg-green-500/10 border-green-500/30 text-green-400" },
            { name: "Power BI", style: "bg-purple-500/10 border-purple-500/30 text-purple-400" }
        ],
        bulletPoints: [
            "Cleaned and preprocessed dataset using Python (Pandas, NumPy)",
            "Performed data extraction and transformation using SQL queries",
            "Created visualizations in Power BI to showcase content trends over the years",
            "Analyzed the distribution of movies vs. TV shows globally",
            "Identified top genres and leading content-producing countries"
        ],
        bottomTags: ["Python", "Pandas", "SQL", "Data Cleaning", "Data Visualization"],
        githubLink: "https://github.com/sandeepmishraofficial"
    }
];

// Global State
let currentAbout = {};
let currentSkills = [];
let currentProjects = [];
let editableAbout = {};
let editableSkills = [];
let editableProjects = [];

// --- Rendering Functions ---

function loadAndRenderAll() {
    const sAbout = localStorage.getItem('userAbout');
    const sSkills = localStorage.getItem('userSkills');
    const sProj = localStorage.getItem('userProjects');

    currentAbout = sAbout ? JSON.parse(sAbout) : JSON.parse(JSON.stringify(defaultAboutData));
    currentSkills = sSkills ? JSON.parse(sSkills) : JSON.parse(JSON.stringify(defaultSkills));
    currentProjects = sProj ? JSON.parse(sProj) : JSON.parse(JSON.stringify(defaultProjectsData));

    renderAbout();
    renderSkills();
    renderProjects();
}

function renderAbout() {
    const container = document.getElementById('about-container');
    if (!container) return;

    // Convert newlines to breaks
    const bioHtml = currentAbout.bio.replace(/\n/g, '<br/>');

    const toolsHtml = currentAbout.tools.map(tool => `
        <li class="flex items-center justify-center w-14 h-14 bg-[#1a1625] border border-[#2d283e] rounded-xl hover:border-blue-500 hover:text-blue-500 transition-colors duration-300 group" title="${tool.name}">
            <i class="${tool.icon} text-gray-400 text-2xl group-hover:text-blue-500 transition"></i>
        </li>
    `).join('');

    container.innerHTML = `
        <div class="max-w-max mx-auto relative group">
            <img src="./images/photo.png" alt="Profile" class="w-52 sm:w-64 rounded-full max-w-none border-4 border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-transform duration-500 group-hover:scale-105" />
            <div class="bg-[#161b22] border border-gray-700 w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-2xl flex items-center justify-center">
                <img src="https://img.icons8.com/ios/50/ffffff/settings--v1.png" alt="Settings" class="w-1/2 animate-spin_slow opacity-50" />
            </div>
        </div>
        <div class="flex-1">
            <p class="mb-8 text-gray-400 text-sm sm:text-base leading-relaxed">${bioHtml}</p>
            <ul class="grid grid-cols-1 gap-6 max-w-md mb-10">
                <li class="bg-[#1a1625] border border-[#2d283e] rounded-xl p-6 hover:border-blue-500 transition-colors duration-300">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="bg-white rounded-md p-1 shrink-0">
                            <img src="${currentAbout.education.logo}" alt="Logo" class="w-10 h-10 object-contain" />
                        </div>
                        <h3 class="font-bold text-white leading-tight">${currentAbout.education.institution}</h3>
                    </div>
                    <p class="text-gray-400 text-sm">${currentAbout.education.degree}</p>
                </li>
            </ul>
            <h3 class="my-4 text-white text-xl font-bold">Tools in Use</h3>
            <ul class="flex flex-wrap gap-4">
                ${toolsHtml}
            </ul>
        </div>
    `;
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = '';
    currentSkills.forEach(category => {
        const skillSpans = category.skills.map(skill => `<span class="px-3 py-1.5 bg-[#0d1117] border border-gray-700 text-gray-300 text-sm rounded-lg">${skill}</span>`).join('');
        container.innerHTML += `
            <div class="bg-[#161b22] border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-colors duration-300">
                <div class="flex items-center gap-3 mb-5">
                    <div class="w-10 h-10 ${category.iconBgClass} rounded-lg flex items-center justify-center">
                        <i class="${category.iconClass} ${category.iconColorClass}"></i>
                    </div>
                    <h3 class="text-white font-semibold text-base">${category.title}</h3>
                </div>
                <div class="flex flex-wrap gap-2">${skillSpans}</div>
            </div>
        `;
    });
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = '';
    currentProjects.forEach(proj => {
        const topTags = proj.topTags.map(t => `<span class="text-xs px-2.5 py-1 ${t.style} rounded-full border">${t.name}</span>`).join('');
        const bullets = proj.bulletPoints.map(b => `<li class="flex items-start gap-2"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>${b}</li>`).join('');
        const btmTags = proj.bottomTags.map(t => `<span class="text-xs px-2.5 py-1 bg-[#0d1117] border border-gray-700 text-gray-300 rounded">${t}</span>`).join('');

        container.innerHTML += `
            <div class="bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 flex flex-col group shadow-lg">
                <div class="relative h-48 bg-gradient-to-br ${proj.gradient} flex items-center justify-center p-6">
                    <div class="text-center">
                        <div class="w-16 h-16 ${proj.mainIconBg} rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <i class="${proj.mainIcon} text-3xl"></i>
                        </div>
                        <div class="flex flex-wrap justify-center gap-2">${topTags}</div>
                    </div>
                </div>
                <div class="p-7 flex flex-col flex-1">
                    <h3 class="text-xl font-bold text-white mb-2">${proj.title}</h3>
                    <ul class="text-gray-400 text-sm space-y-2 mb-6 flex-1">${bullets}</ul>
                    <div class="flex flex-wrap gap-2 mb-5 pt-4 border-t border-gray-800">${btmTags}</div>
                    <a href="${proj.githubLink}" target="_blank" rel="noopener noreferrer" class="w-max px-5 py-2 rounded border border-gray-700 text-blue-400 font-medium hover:text-white hover:border-blue-500 hover:bg-blue-600/20 transition-all flex items-center gap-2">
                        View on GitHub <i class="fas fa-external-link-alt text-xs"></i>
                    </a>
                </div>
            </div>
        `;
    });
}

// --- Editor Functions ---

// 1. About Editor
function openAboutEditor() {
    editableAbout = JSON.parse(JSON.stringify(currentAbout));
    document.getElementById('about-bio-input').value = editableAbout.bio;
    
    const modal = document.getElementById('about-editor-modal');
    const content = document.getElementById('about-editor-content');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => { modal.classList.remove('opacity-0'); content.classList.remove('scale-95'); content.classList.add('scale-100'); }, 10);
}

function closeAboutEditor() {
    const modal = document.getElementById('about-editor-modal');
    const content = document.getElementById('about-editor-content');
    modal.classList.add('opacity-0');
    content.classList.remove('scale-100'); content.classList.add('scale-95');
    setTimeout(() => { modal.classList.add('hidden'); modal.classList.remove('flex'); }, 300);
}

function saveAbout() {
    editableAbout.bio = document.getElementById('about-bio-input').value;
    currentAbout = JSON.parse(JSON.stringify(editableAbout));
    localStorage.setItem('userAbout', JSON.stringify(currentAbout));
    renderAbout();
    closeAboutEditor();
}

// 2. Skills Editor
function openSkillEditor() {
    editableSkills = JSON.parse(JSON.stringify(currentSkills));
    renderEditorCategories();
    
    const modal = document.getElementById('skill-editor-modal');
    const content = document.getElementById('skill-editor-content');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => { modal.classList.remove('opacity-0'); content.classList.remove('scale-95'); content.classList.add('scale-100'); }, 10);
}

function closeSkillEditor() {
    const modal = document.getElementById('skill-editor-modal');
    const content = document.getElementById('skill-editor-content');
    modal.classList.add('opacity-0');
    content.classList.remove('scale-100'); content.classList.add('scale-95');
    setTimeout(() => { modal.classList.add('hidden'); modal.classList.remove('flex'); }, 300);
}

function renderEditorCategories() {
    const container = document.getElementById('editor-categories');
    container.innerHTML = '';
    
    editableSkills.forEach((category, catIndex) => {
        const skillTags = category.skills.map((skill, skillIndex) => `
            <div class="flex items-center gap-2 bg-[#0d1117] border border-gray-700 px-3 py-1.5 rounded-lg text-sm text-gray-300 group">
                <span>${skill}</span>
                <button onclick="removeEditorSkill(${catIndex}, ${skillIndex})" class="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><i class="fas fa-times"></i></button>
            </div>
        `).join('');

        container.innerHTML += `
            <div class="border border-gray-800 rounded-xl p-4 bg-[#1a1f29]">
                <div class="flex items-center gap-3 mb-4">
                    <i class="${category.iconClass} ${category.iconColorClass}"></i>
                    <h4 class="text-white font-medium">${category.title}</h4>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">${skillTags}</div>
                <div class="flex gap-2 mt-2">
                    <input type="text" id="add-skill-input-${catIndex}" placeholder="Add new skill..." class="flex-1 bg-[#0d1117] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" onkeypress="if(event.key === 'Enter') addEditorSkill(${catIndex})">
                    <button onclick="addEditorSkill(${catIndex})" class="px-4 py-2 bg-[#2d333b] hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">Add</button>
                </div>
            </div>
        `;
    });
}

function addEditorSkill(catIndex) {
    const val = document.getElementById(`add-skill-input-${catIndex}`).value.trim();
    if (val) { editableSkills[catIndex].skills.push(val); renderEditorCategories(); }
}
function removeEditorSkill(catIndex, skillIndex) {
    editableSkills[catIndex].skills.splice(skillIndex, 1);
    renderEditorCategories();
}
function saveSkills() {
    currentSkills = JSON.parse(JSON.stringify(editableSkills));
    localStorage.setItem('userSkills', JSON.stringify(currentSkills));
    renderSkills();
    closeSkillEditor();
}

// 3. Projects Editor
function openProjectEditor() {
    editableProjects = JSON.parse(JSON.stringify(currentProjects));
    renderProjectEditorList();
    
    const modal = document.getElementById('project-editor-modal');
    const content = document.getElementById('project-editor-content');
    modal.classList.remove('hidden'); modal.classList.add('flex');
    setTimeout(() => { modal.classList.remove('opacity-0'); content.classList.remove('scale-95'); content.classList.add('scale-100'); }, 10);
}

function closeProjectEditor() {
    const modal = document.getElementById('project-editor-modal');
    const content = document.getElementById('project-editor-content');
    modal.classList.add('opacity-0'); content.classList.remove('scale-100'); content.classList.add('scale-95');
    setTimeout(() => { modal.classList.add('hidden'); modal.classList.remove('flex'); }, 300);
}

function renderProjectEditorList() {
    const container = document.getElementById('project-editor-list');
    container.innerHTML = '';
    
    editableProjects.forEach((proj, idx) => {
        const bulletsText = proj.bulletPoints.join('\n');
        
        container.innerHTML += `
            <div class="border border-gray-800 rounded-xl p-4 bg-[#1a1f29] mb-4">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1 mr-4">
                        <label class="block text-sm font-medium text-gray-300 mb-1">Project Title</label>
                        <input type="text" id="proj-title-${idx}" value="${proj.title}" class="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" onchange="editableProjects[${idx}].title = this.value">
                    </div>
                    <button onclick="removeEditorProject(${idx})" class="mt-6 px-3 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg transition-colors" title="Delete Project"><i class="fas fa-trash"></i></button>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Bullet Points (One per line)</label>
                    <textarea id="proj-bullets-${idx}" rows="4" class="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" onchange="updateProjectBullets(${idx}, this.value)">${bulletsText}</textarea>
                </div>
            </div>
        `;
    });
}
function updateProjectBullets(idx, value) {
    editableProjects[idx].bulletPoints = value.split('\n').filter(line => line.trim() !== '');
}
function removeEditorProject(idx) {
    editableProjects.splice(idx, 1);
    renderProjectEditorList();
}
function saveProjects() {
    currentProjects = JSON.parse(JSON.stringify(editableProjects));
    localStorage.setItem('userProjects', JSON.stringify(currentProjects));
    renderProjects();
    closeProjectEditor();
}


// --- Main App Logic ---

document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderAll();

    // Navbar Scroll Effect
    const navBar = document.getElementById('main-nav');
    if (navBar) {
        window.addEventListener('scroll', () => {
            if (scrollY > 50) {
                navBar.classList.add('bg-[#0d1117]/50', 'backdrop-blur-lg', 'shadow-sm', 'border-b', 'border-white/5');
                navBar.classList.remove('bg-transparent');
            } else {
                navBar.classList.remove('bg-[#0d1117]/50', 'backdrop-blur-lg', 'shadow-sm', 'border-b', 'border-white/5');
                navBar.classList.add('bg-transparent');
            }
        });
    }

    // Close mobile menu
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('[onclick="toggleMenu()"]');
        if (menu && !menu.contains(e.target) && !hamburger?.contains(e.target)) {
            menu.classList.add('-right-72');
            menu.classList.remove('right-0');
        }
    });

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formFeedback = document.getElementById('form-feedback');
            const submitBtn = document.getElementById('submit-button');
            const submitText = document.getElementById('submit-text');
            const submitIcon = document.getElementById('submit-icon');
            
            const lastSubmitTime = localStorage.getItem('lastFormSubmit');
            if (lastSubmitTime && (Date.now() - parseInt(lastSubmitTime) < 60000)) {
                showFeedback('Please wait a minute before submitting again.', 'error');
                return;
            }

            const formData = new FormData(contactForm);
            if (formData.get('name').trim().length < 3) return showFeedback('Name must be at least 3 characters.', 'error');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('email').trim())) return showFeedback('Enter valid email.', 'error');
            if (formData.get('message').trim().length < 10) return showFeedback('Message must be 10+ characters.', 'error');

            if(submitBtn) submitBtn.disabled = true;
            if(submitText) submitText.textContent = 'Submitting...';
            if(submitIcon) submitIcon.className = 'fas fa-spinner fa-spin text-sm ml-2';
            if(formFeedback) formFeedback.classList.add('hidden');

            try {
                const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
                const data = await response.json();
                if (data.success) {
                    showFeedback('Message sent successfully! Thank you.', 'success');
                    contactForm.reset();
                    localStorage.setItem('lastFormSubmit', Date.now().toString());
                } else {
                    showFeedback('Something went wrong. Please try again.', 'error');
                }
            } catch (error) {
                showFeedback('Network error. Please try again later.', 'error');
            } finally {
                if(submitBtn) submitBtn.disabled = false;
                if(submitText) submitText.textContent = 'Submit now';
                if(submitIcon) submitIcon.className = 'fas fa-paper-plane text-sm ml-2';
            }
        });
    }
    
    function showFeedback(message, type) {
        const fb = document.getElementById('form-feedback');
        if(!fb) return;
        fb.textContent = message;
        fb.className = `border py-2 px-4 rounded-md mb-4 text-sm text-center ${type === 'error' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`;
    }
});

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu?.classList.toggle('-right-72');
    menu?.classList.toggle('right-0');
}

// Anti-Copy
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('paste', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && ['I','J','C','i','j','c'].includes(e.key)) e.preventDefault();
    if (e.ctrlKey && ['U','u'].includes(e.key)) e.preventDefault();
});

// --- Admin Authentication Mode ---

function checkAdminMode() {
    if (localStorage.getItem('isAdmin') === 'true') {
        document.body.classList.add('admin-mode');
    } else {
        document.body.classList.remove('admin-mode');
    }
}

// Check on load
checkAdminMode();

function triggerAdminLogin() {
    if (localStorage.getItem('isAdmin') === 'true') {
        alert('You are already in Admin Mode.');
        return;
    }
    const password = prompt('Enter Admin Password:');
    if (password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        checkAdminMode();
        alert('Admin Mode Activated! You can now edit the website.');
    } else if (password !== null) {
        alert('Incorrect Password!');
    }
}

// Secret Keyboard Shortcut: Ctrl + Shift + A
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        triggerAdminLogin();
    }
});

// Mobile Secret Trigger: Tap Copyright 3 times
let adminClickCount = 0;
let adminClickTimer;
const mobileTrigger = document.getElementById('secret-mobile-trigger');
if (mobileTrigger) {
    mobileTrigger.addEventListener('click', () => {
        adminClickCount++;
        clearTimeout(adminClickTimer);
        
        if (adminClickCount >= 3) {
            adminClickCount = 0;
            triggerAdminLogin();
        } else {
            adminClickTimer = setTimeout(() => {
                adminClickCount = 0;
            }, 1000);
        }
    });
}

function logoutAdmin() {
    if(confirm('Are you sure you want to lock the editor?')) {
        localStorage.removeItem('isAdmin');
        checkAdminMode();
        alert('Editor locked successfully.');
    }
}
