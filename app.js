// --- Page Loader ---
// Hide loader after 1s minimum OR when page is ready (whichever is later)
(function () {
    const MIN_TIME = 1000; // milliseconds
    const startTime = Date.now();

    function hideLoader() {
        const loader = document.getElementById('page-loader');
        if (!loader) return;
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, MIN_TIME - elapsed);
        setTimeout(() => { loader.classList.add('hidden'); }, delay);
    }

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
})();

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
        githubLink: "https://github.com/sandeepmishraofficial",
        liveLink: ""
    },
    {
        title: "IPL Analysis & Dashboard",
        gradient: "from-[#1e3a8a] via-[#1e40af] to-[#0d1117]",
        mainIconBg: "bg-blue-500/20",
        mainIcon: "fas fa-trophy text-blue-400",
        topTags: [
            { name: "Power BI", style: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" },
            { name: "SQL", style: "bg-green-500/10 border-green-500/30 text-green-400" },
            { name: "Python", style: "bg-blue-500/10 border-blue-500/30 text-blue-400" }
        ],
        bulletPoints: [
            "Built an interactive Power BI dashboard to analyze IPL player and team performance across multiple seasons",
            "Processed and structured match datasets to extract key insights on venue records and toss decisions",
            "Formulated advanced DAX measures to calculate strike rate, economy, boundary percentage, and player stats",
            "Designed dynamic visualizations showing batting/bowling statistics, top performance metrics, and match outcomes",
            "Provided actionable insights to help identify winning trends and team strategies based on historical data"
        ],
        bottomTags: ["Power BI", "DAX", "SQL", "Data Cleaning", "Sports Analytics"],
        githubLink: "https://github.com/sandeepmishraofficial",
        liveLink: "https://app.powerbi.com/groups/me/reports/402e3dac-cd73-4b5b-ba16-a3503b3f24a8/d2a1f8cd092a905ddbe0?experience=power-bi"
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

    let projectsUpdated = false;

    // Migration/Update: Filter out the Sales Data Analysis project if it is present
    const hasSales = currentProjects.some(proj => proj.title && proj.title.toLowerCase().includes('sales data'));
    if (hasSales) {
        currentProjects = currentProjects.filter(proj => !proj.title.toLowerCase().includes('sales data'));
        projectsUpdated = true;
    }

    // Migration/Update check: Ensure IPL Analysis project is present and has the correct liveLink
    let hasIPL = false;
    currentProjects.forEach(proj => {
        if (proj.title && proj.title.toLowerCase().includes('ipl')) {
            hasIPL = true;
            if (proj.liveLink !== "https://app.powerbi.com/groups/me/reports/402e3dac-cd73-4b5b-ba16-a3503b3f24a8/d2a1f8cd092a905ddbe0?experience=power-bi") {
                proj.liveLink = "https://app.powerbi.com/groups/me/reports/402e3dac-cd73-4b5b-ba16-a3503b3f24a8/d2a1f8cd092a905ddbe0?experience=power-bi";
                projectsUpdated = true;
            }
        }
    });

    if (!hasIPL) {
        const iplProj = defaultProjectsData.find(proj => proj.title.toLowerCase().includes('ipl'));
        if (iplProj) {
            currentProjects.push(JSON.parse(JSON.stringify(iplProj)));
            projectsUpdated = true;
        }
    }

    if (projectsUpdated) {
        localStorage.setItem('userProjects', JSON.stringify(currentProjects));
    }

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
    
    container.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto";
    container.innerHTML = '';
    
    currentSkills.forEach((category, idx) => {
        const count = category.skills.length;
        container.innerHTML += `
            <button onclick="openSkillPopup(${idx})" class="relative group overflow-hidden bg-[#161b22] border border-gray-800 rounded-xl p-4 sm:p-5 text-left hover:border-blue-500/50 hover:bg-[#1a212c] transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover-float w-full">
                <!-- Shimmer reflection on hover -->
                <span class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:animate-shimmer"></span>
                
                <div class="flex items-center gap-3 sm:gap-4">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 ${category.iconBgClass || 'bg-blue-600/10'} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <i class="${category.iconClass} ${category.iconColorClass || 'text-blue-400'} text-base sm:text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-white font-bold text-sm sm:text-base tracking-wide group-hover:text-blue-400 transition-colors">${category.title}</h3>
                        <p class="text-gray-400 text-[10px] sm:text-xs mt-0.5">${count} Skills</p>
                    </div>
                </div>
                
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0d1117] border border-gray-800 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-blue-500 transition-colors shrink-0">
                    <i class="fas fa-chevron-right text-[10px] sm:text-xs group-hover:translate-x-0.5 transition-transform"></i>
                </div>
            </button>
        `;
    });
}

// --- Skill Viewer Popup ---
function openSkillPopup(idx) {
    const category = currentSkills[idx];
    if (!category) return;

    document.getElementById('skill-viewer-name').textContent = category.title;
    
    // Set category icon
    const iconEl = document.getElementById('skill-viewer-icon');
    iconEl.className = `${category.iconClass} ${category.iconColorClass || 'text-blue-400'}`;

    // Populate skills tags
    const listEl = document.getElementById('skill-viewer-list');
    listEl.innerHTML = category.skills.map(skill => `
        <span class="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0d1117] border border-gray-700 text-gray-300 text-xs sm:text-sm font-medium rounded-xl hover:border-blue-500 hover:text-white hover:bg-blue-600/5 transition-all duration-300 cursor-default flex items-center gap-1.5 shadow-sm hover-float">
            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            ${skill}
        </span>
    `).join('');

    // Open Modal with animations
    const modal = document.getElementById('skill-viewer-modal');
    const content = document.getElementById('skill-viewer-content');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
}

function closeSkillPopup() {
    const modal = document.getElementById('skill-viewer-modal');
    const content = document.getElementById('skill-viewer-content');
    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = '';
    currentProjects.forEach(proj => {
        const topTags = proj.topTags.map(t => `<span class="text-xs px-2.5 py-1 ${t.style} rounded-full border">${t.name}</span>`).join('');
        const bullets = proj.bulletPoints.map(b => `<li class="flex items-start gap-2"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>${b}</li>`).join('');
        const btmTags = proj.bottomTags.map(t => `<span class="text-xs px-2.5 py-1 bg-[#0d1117] border border-gray-700 text-gray-300 rounded">${t}</span>`).join('');

        const githubBtn = proj.githubLink ? `
            <a href="${proj.githubLink}" target="_blank" rel="noopener noreferrer" class="relative group/btn overflow-hidden px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-medium hover:text-white hover:border-gray-500 hover:bg-gray-800/85 transition-all duration-300 flex items-center gap-2 text-xs shadow-[0_0_10px_rgba(255,255,255,0.02)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover-float">
                <!-- Shimmer reflection effect -->
                <span class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover/btn:animate-shimmer"></span>
                <i class="fab fa-github text-sm group-hover/btn:scale-110 transition-transform duration-300"></i>
                <span>GitHub</span>
                <i class="fas fa-arrow-right text-[10px] group-hover/btn:translate-x-0.5 transition-transform duration-300"></i>
            </a>
        ` : '';

        const liveBtn = proj.liveLink ? `
            <a href="${proj.liveLink}" target="_blank" rel="noopener noreferrer" class="relative group/btn overflow-hidden px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 flex items-center gap-2 text-xs shadow-[0_0_12px_rgba(59,130,246,0.35)] hover:shadow-[0_0_20px_rgba(59,130,246,0.55)] live-pulse-btn hover-float">
                <!-- Shimmer reflection effect -->
                <span class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] group-hover/btn:animate-shimmer"></span>
                <i class="fas fa-chart-line text-xs group-hover/btn:scale-110 transition-transform duration-300"></i>
                <span>Live Dashboard</span>
                <i class="fas fa-arrow-right text-[10px] group-hover/btn:translate-x-0.5 transition-transform duration-300"></i>
            </a>
        ` : '';

        const linksHtml = (githubBtn || liveBtn) ? `
            <div class="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-gray-800">
                ${githubBtn}
                ${liveBtn}
            </div>
        ` : '';

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
                    ${linksHtml}
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
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">GitHub Link</label>
                        <input type="text" id="proj-github-${idx}" value="${proj.githubLink || ''}" class="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" onchange="editableProjects[${idx}].githubLink = this.value">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Live Link (Optional)</label>
                        <input type="text" id="proj-live-${idx}" value="${proj.liveLink || ''}" class="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" onchange="editableProjects[${idx}].liveLink = this.value">
                    </div>
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
function addNewProject() {
    editableProjects.push({
        title: "New Project",
        gradient: "from-[#1a2744] to-[#0d1117]",
        mainIconBg: "bg-blue-500/20",
        mainIcon: "fas fa-folder text-blue-400",
        topTags: [
            { name: "Power BI", style: "bg-blue-500/10 border-blue-500/30 text-blue-400" }
        ],
        bulletPoints: ["Project detail 1", "Project detail 2"],
        bottomTags: ["Data Analysis"],
        githubLink: "",
        liveLink: ""
    });
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

    // Close skill viewer modal on backdrop click
    const skillViewerModal = document.getElementById('skill-viewer-modal');
    if (skillViewerModal) {
        skillViewerModal.addEventListener('click', (e) => {
            if (e.target === skillViewerModal) {
                closeSkillPopup();
            }
        });
    }

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
    const pwdInput = document.getElementById('admin-password-input');
    if (pwdInput) pwdInput.value = '';
    const errText = document.getElementById('admin-login-err');
    if (errText) errText.classList.add('hidden');

    const modal = document.getElementById('admin-login-modal');
    const content = document.getElementById('admin-login-content');
    if (modal && content) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
            pwdInput.focus();
        }, 10);
    }
}

function closeAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    const content = document.getElementById('admin-login-content');
    if (modal && content) {
        modal.classList.add('opacity-0');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
}

function submitAdminLogin() {
    const pwdInput = document.getElementById('admin-password-input');
    const errText = document.getElementById('admin-login-err');
    if (pwdInput) {
        const password = pwdInput.value;
        if (password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            checkAdminMode();
            closeAdminLogin();
            alert('Admin Mode Activated! You can now edit the website.');
        } else {
            if (errText) {
                errText.classList.remove('hidden');
            } else {
                alert('Incorrect Password!');
            }
        }
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

// =============================================
// PORTFOLIO VISITOR TRACKING SYSTEM
// =============================================
(function () {
    function pvGet(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } }
    function pvSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

    // 1. Record visit timestamp
    const visits = pvGet('pv_visits', []);
    const now = new Date().toISOString();
    visits.push(now);
    if (visits.length > 500) visits.splice(0, visits.length - 500); // keep last 500
    pvSet('pv_visits', visits);

    // 2. Daily count
    const today = now.slice(0, 10);
    const daily = pvGet('pv_daily', {});
    daily[today] = (daily[today] || 0) + 1;
    pvSet('pv_daily', daily);

    // 3. Device type
    const devices = pvGet('pv_devices', {});
    const ua = navigator.userAgent;
    const dev = /Mobi|Android/i.test(ua) ? 'Mobile' : /Tablet|iPad/i.test(ua) ? 'Tablet' : 'Desktop';
    devices[dev] = (devices[dev] || 0) + 1;
    pvSet('pv_devices', devices);

    // 4. Traffic source
    const sources = pvGet('pv_sources', {});
    const ref = document.referrer;
    let src = 'Direct';
    if (ref.includes('github')) src = 'GitHub';
    else if (ref.includes('linkedin')) src = 'LinkedIn';
    else if (ref.includes('google')) src = 'Google';
    else if (ref.includes('twitter') || ref.includes('x.com')) src = 'Twitter/X';
    else if (ref) src = 'Other';
    sources[src] = (sources[src] || 0) + 1;
    pvSet('pv_sources', sources);

    // 5. Session log
    const sessions = pvGet('pv_sessions', []);
    sessions.push({ time: now, device: dev, source: src });
    if (sessions.length > 100) sessions.splice(0, sessions.length - 100);
    pvSet('pv_sessions', sessions);

    // 6. Time on page (record on unload)
    const pageStart = Date.now();
    window.addEventListener('beforeunload', () => {
        const elapsed = Math.round((Date.now() - pageStart) / 1000);
        if (elapsed > 2 && elapsed < 3600) {
            const times = pvGet('pv_times', []);
            times.push(elapsed);
            if (times.length > 200) times.splice(0, times.length - 200);
            pvSet('pv_times', times);
        }
    });

    // 7. Section engagement via IntersectionObserver
    window.addEventListener('DOMContentLoaded', () => {
        const sectionMap = {
            'top': 'Home', 'About': 'About',
            'skills-section': 'Skills', 'experience': 'Experience',
            'project': 'Projects', 'Contact me': 'Contact'
        };
        const observed = new Set();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !observed.has(entry.target.id)) {
                    observed.add(entry.target.id);
                    const label = sectionMap[entry.target.id];
                    if (label) {
                        const secs = pvGet('pv_sections', {});
                        secs[label] = (secs[label] || 0) + 1;
                        pvSet('pv_sections', secs);
                    }
                }
            });
        }, { threshold: 0.3 });

        Object.keys(sectionMap).forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // 8. Track contact form clicks
        const contactLink = document.getElementById('contact-form');
        if (contactLink) {
            contactLink.addEventListener('submit', () => {
                pvSet('pv_contacts', pvGet('pv_contacts', 0) + 1);
            });
        }
    });
})();

