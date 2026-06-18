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
        title: "IPL Data Analysis Dashboard (2008–2025)",
        gradient: "from-[#1e3a8a] via-[#1e40af] to-[#0d1117]",
        mainIconBg: "bg-blue-500/20",
        mainIcon: "fas fa-trophy text-blue-400",
        topTags: [
            { name: "Power BI", style: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" },
            { name: "Advance Excel", style: "bg-green-500/10 border-green-500/30 text-green-400" },
            { name: "DAX", style: "bg-blue-500/10 border-blue-500/30 text-blue-400" }
        ],
        bulletPoints: [
            "Built an interactive IPL dashboard using Power BI, Excel, and DAX",
            "Analyzed team performance and player statistics across IPL seasons (2008–2025)",
            "Created custom KPIs including Season Winner, Runner-Up, Orange Cap, and Purple Cap",
            "Developed insights for runs, wickets, boundaries, and season trends",
            "Added interactive filters, team logos, and player visuals for better user experience",
            "Performed data cleaning, data modeling, and dashboard design"
        ],
        bottomTags: ["Power BI", "DAX", "Advance Excel", "Data Cleaning", "Data Modeling"],
        githubLink: "https://github.com/sandeepmishraofficial",
        liveLink: "https://drive.google.com/drive/u/1/folders/12qIf4xDM2DAOtzPKmLjoIQAoWXpEsvmL",
        previewImage: "./images/ipl-dashboard.png",
        seasonFolder: "./images/ipl all season image",
        seasonStart: 2008,
        seasonEnd: 2025
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

    // Migration/Update check: Ensure IPL Analysis project is present and has the correct title, details, and season data
    let hasIPL = false;
    currentProjects.forEach(proj => {
        if (proj.title && proj.title.toLowerCase().includes('ipl')) {
            hasIPL = true;
            const expectedBullets = [
                "Built an interactive IPL dashboard using Power BI, Excel, and DAX",
                "Analyzed team performance and player statistics across IPL seasons (2008–2025)",
                "Created custom KPIs including Season Winner, Runner-Up, Orange Cap, and Purple Cap",
                "Developed insights for runs, wickets, boundaries, and season trends",
                "Added interactive filters, team logos, and player visuals for better user experience",
                "Performed data cleaning, data modeling, and dashboard design"
            ];
            const hasCorrectBullets = Array.isArray(proj.bulletPoints) && 
                proj.bulletPoints.length === expectedBullets.length &&
                proj.bulletPoints.every((b, i) => b === expectedBullets[i]);

            if (proj.title !== "IPL Data Analysis Dashboard (2008–2025)" ||
                !hasCorrectBullets ||
                proj.liveLink !== "https://drive.google.com/drive/u/1/folders/12qIf4xDM2DAOtzPKmLjoIQAoWXpEsvmL" || 
                proj.previewImage !== "./images/ipl-dashboard.png" ||
                proj.seasonFolder !== "./images/ipl all season image" ||
                proj.seasonStart !== 2008 ||
                proj.seasonEnd !== 2025) {
                
                proj.title = "IPL Data Analysis Dashboard (2008–2025)";
                proj.topTags = [
                    { name: "Power BI", style: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" },
                    { name: "Advance Excel", style: "bg-green-500/10 border-green-500/30 text-green-400" },
                    { name: "DAX", style: "bg-blue-500/10 border-blue-500/30 text-blue-400" }
                ];
                proj.bulletPoints = expectedBullets;
                proj.bottomTags = ["Power BI", "DAX", "Advance Excel", "Data Cleaning", "Data Modeling"];
                proj.liveLink = "https://drive.google.com/drive/u/1/folders/12qIf4xDM2DAOtzPKmLjoIQAoWXpEsvmL";
                proj.previewImage = "./images/ipl-dashboard.png";
                proj.seasonFolder = "./images/ipl all season image";
                proj.seasonStart = 2008;
                proj.seasonEnd = 2025;
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
    currentProjects.forEach((proj, idx) => {
        const topTags = proj.topTags.map(t => `<span class="text-xs px-2.5 py-1 ${t.style} rounded-full border">${t.name}</span>`).join('');
        const bullets = proj.bulletPoints.map(b => `<li class="flex items-start gap-2"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>${b}</li>`).join('');
        const btmTags = proj.bottomTags.map(t => `<span class="text-xs px-2.5 py-1 bg-[#0d1117] border border-gray-700 text-gray-300 rounded">${t}</span>`).join('');

        const previewBtn = (proj.previewImage || proj.seasonFolder) ? `
            <button onclick="openImagePreview(${idx})" class="flex-1 sm:flex-none justify-center relative group/btn overflow-hidden px-3 sm:px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-medium hover:text-white hover:border-gray-500 hover:bg-gray-800/85 transition-all duration-300 flex items-center gap-2 text-xs shadow-[0_0_10px_rgba(255,255,255,0.02)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover-float cursor-pointer">
                <!-- Shimmer reflection effect -->
                <span class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover/btn:animate-shimmer"></span>
                <i class="fas fa-eye text-xs group-hover/btn:scale-110 transition-transform duration-300"></i>
                <span>Preview</span>
                <i class="fas fa-arrow-right text-[10px] group-hover/btn:translate-x-0.5 transition-transform duration-300"></i>
            </button>
        ` : '';

        const githubBtn = proj.githubLink ? `
            <a href="${proj.githubLink}" target="_blank" rel="noopener noreferrer" class="flex-1 sm:flex-none justify-center relative group/btn overflow-hidden px-3 sm:px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-medium hover:text-white hover:border-gray-500 hover:bg-gray-800/85 transition-all duration-300 flex items-center gap-2 text-xs shadow-[0_0_10px_rgba(255,255,255,0.02)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover-float">
                <!-- Shimmer reflection effect -->
                <span class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover/btn:animate-shimmer"></span>
                <i class="fab fa-github text-sm group-hover/btn:scale-110 transition-transform duration-300"></i>
                <span>GitHub</span>
                <i class="fas fa-arrow-right text-[10px] group-hover/btn:translate-x-0.5 transition-transform duration-300"></i>
            </a>
        ` : '';

        let liveBtnLabel = "Live Dashboard";
        let liveBtnIcon = "fas fa-chart-line";
        let liveBtnDownload = "";

        if (proj.liveLink && (proj.liveLink.toLowerCase().endsWith('.pbix') || proj.liveLink.includes('drive.google.com'))) {
            liveBtnLabel = "Download Dashboard";
            liveBtnIcon = "fas fa-file-download";
            liveBtnDownload = proj.liveLink.toLowerCase().endsWith('.pbix') ? `download="${proj.liveLink.split('/').pop()}"` : "";
        }

        const liveBtn = proj.liveLink ? `
            <a href="${proj.liveLink}" ${liveBtnDownload} target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto justify-center relative group/btn overflow-hidden px-3 sm:px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 flex items-center gap-2 text-xs shadow-[0_0_12px_rgba(59,130,246,0.35)] hover:shadow-[0_0_20px_rgba(59,130,246,0.55)] live-pulse-btn hover-float">
                <!-- Shimmer reflection effect -->
                <span class="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] group-hover/btn:animate-shimmer"></span>
                <i class="${liveBtnIcon} text-xs group-hover/btn:scale-110 transition-transform duration-300"></i>
                <span>${liveBtnLabel}</span>
                <i class="fas fa-arrow-right text-[10px] group-hover/btn:translate-x-0.5 transition-transform duration-300"></i>
            </a>
        ` : '';

        const linksHtml = (githubBtn || liveBtn || previewBtn) ? `
            <div class="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-gray-800">
                ${previewBtn}
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

// --- Image Preview Modal ---
// --- Image Preview Modal ---
function openImagePreview(idx, selectedSeasonYear = null) {
    const proj = currentProjects[idx];
    if (!proj) return;

    const modal = document.getElementById('image-preview-modal');
    const content = document.getElementById('image-preview-content');
    const img = document.getElementById('image-preview-img');
    const titleEl = document.getElementById('image-preview-title');
    const seasonsContainer = document.getElementById('image-preview-seasons');

    if (!modal || !img) return;

    // Reset transition states
    img.classList.remove('opacity-0');

    if (titleEl) titleEl.textContent = `${proj.title} — Dashboard Preview`;

    const isIPL = proj.title && proj.title.toLowerCase().includes('ipl');

    if (proj.seasonFolder && proj.seasonStart && proj.seasonEnd) {
        if (seasonsContainer) {
            seasonsContainer.classList.remove('hidden');
            seasonsContainer.classList.add('flex');

            const targetYear = (selectedSeasonYear && selectedSeasonYear >= proj.seasonStart && selectedSeasonYear <= proj.seasonEnd)
                ? parseInt(selectedSeasonYear)
                : proj.seasonEnd;

            let buttonsHtml = '';
            for (let year = proj.seasonEnd; year >= proj.seasonStart; year--) {
                const imgPath = `${proj.seasonFolder}/Season_${year}.png`;
                const isActive = (year === targetYear);
                const btnClass = isActive 
                    ? "px-3 py-1.5 rounded-lg border border-blue-500 bg-blue-600/20 text-blue-400 text-xs font-semibold transition duration-200 cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.3)] shrink-0"
                    : "px-3 py-1.5 rounded-lg border border-gray-700 bg-transparent text-gray-400 hover:text-white hover:border-gray-500 text-xs font-semibold transition duration-200 cursor-pointer shrink-0";
                buttonsHtml += `<button onclick="selectSeason(this, '${imgPath}')" class="${btnClass}">${year}</button>`;
            }
            seasonsContainer.innerHTML = buttonsHtml;
            img.src = `${proj.seasonFolder}/Season_${targetYear}.png`;

            // Update URL hash dynamically without adding to history stack
            if (isIPL) {
                history.replaceState("", document.title, window.location.pathname + window.location.search + "#ipl-" + targetYear);
            }
        }
    } else {
        if (seasonsContainer) {
            seasonsContainer.classList.add('hidden');
            seasonsContainer.classList.remove('flex');
            seasonsContainer.innerHTML = '';
        }
        img.src = proj.previewImage || '';

        // Update URL hash for non-season project
        if (proj.title) {
            const slug = proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            history.replaceState("", document.title, window.location.pathname + window.location.search + "#" + slug + "-preview");
        }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
}

function selectSeason(btn, imgPath) {
    const seasonsContainer = document.getElementById('image-preview-seasons');
    if (!seasonsContainer) return;

    // Reset all buttons to inactive state
    const buttons = seasonsContainer.querySelectorAll('button');
    buttons.forEach(b => {
        b.className = "px-3 py-1.5 rounded-lg border border-gray-700 bg-transparent text-gray-400 hover:text-white hover:border-gray-500 text-xs font-semibold transition duration-200 cursor-pointer shrink-0";
    });

    // Make the clicked button active
    btn.className = "px-3 py-1.5 rounded-lg border border-blue-500 bg-blue-600/20 text-blue-400 text-xs font-semibold transition duration-200 cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.3)] shrink-0";

    const img = document.getElementById('image-preview-img');
    if (!img) return;

    // Smooth transition: fade out, change src, and fade in
    img.classList.add('opacity-0');
    setTimeout(() => {
        img.onload = function() {
            img.classList.remove('opacity-0');
            img.onload = null; // Clean up handler
        };
        img.src = imgPath;
    }, 200);

    // Update URL hash dynamically if it's IPL
    const year = btn.textContent.trim();
    if (year && !isNaN(year)) {
        history.replaceState("", document.title, window.location.pathname + window.location.search + "#ipl-" + year);
    }
}

function closeImagePreview() {
    const modal = document.getElementById('image-preview-modal');
    const content = document.getElementById('image-preview-content');
    if (!modal) return;

    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Clean up elements to avoid quick flash next time it opens
        const img = document.getElementById('image-preview-img');
        if (img) img.src = '';
    }, 300);

    // Reset URL hash to #project without causing page jump
    const hash = window.location.hash;
    if (hash.startsWith('#ipl') || hash.endsWith('-preview')) {
        history.replaceState("", document.title, window.location.pathname + window.location.search + "#project");
    }
}

function handleDeepLinking() {
    const hash = window.location.hash.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const projectParam = urlParams.get('project');
    const seasonParam = urlParams.get('season');

    let targetProjectIdx = -1;
    let targetSeason = null;

    if (projectParam) {
        // Find project matching parameter case-insensitively
        targetProjectIdx = currentProjects.findIndex(proj => 
            proj.title && proj.title.toLowerCase().includes(projectParam.toLowerCase())
        );
        if (seasonParam) {
            targetSeason = parseInt(seasonParam);
        }
    } else if (hash) {
        // Check if it's IPL season specific, e.g. #ipl-2024
        if (hash.startsWith('#ipl')) {
            targetProjectIdx = currentProjects.findIndex(proj => 
                proj.title && proj.title.toLowerCase().includes('ipl')
            );
            const yearMatch = hash.match(/\b(20\d{2}|19\d{2})\b/);
            if (yearMatch) {
                targetSeason = parseInt(yearMatch[0]);
            }
        } else {
            // Check for general project previews, e.g. #netflix-data-analysis-preview or #netflix-preview
            currentProjects.forEach((proj, idx) => {
                if (proj.title) {
                    const slug = proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    if (hash === `#${slug}-preview` || hash === `#${slug}`) {
                        targetProjectIdx = idx;
                    } else if (hash.includes(slug.split('-')[0]) && hash.includes('preview')) {
                        // fallback: e.g. #netflix-preview matches Netflix project
                        targetProjectIdx = idx;
                    }
                }
            });
        }
    }

    if (targetProjectIdx !== -1) {
        const projectSection = document.getElementById('project');
        if (projectSection) {
            projectSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Short delay to let the scroll complete before showing modal
        setTimeout(() => {
            openImagePreview(targetProjectIdx, targetSeason);
        }, 600);
    }
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


// --- Theme Toggle Logic ---
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const mobileThemeToggleIcon = document.getElementById('mobile-theme-toggle-icon');
    const mobileThemeToggleText = document.getElementById('mobile-theme-toggle-text');
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light');
            if (themeToggleIcon) {
                themeToggleIcon.classList.remove('fa-moon');
                themeToggleIcon.classList.add('fa-sun');
            }
            if (mobileThemeToggleIcon) {
                mobileThemeToggleIcon.classList.remove('fa-moon');
                mobileThemeToggleIcon.classList.add('fa-sun');
            }
            if (mobileThemeToggleText) {
                mobileThemeToggleText.textContent = 'Light Mode';
            }
        } else {
            document.documentElement.classList.remove('light');
            if (themeToggleIcon) {
                themeToggleIcon.classList.remove('fa-sun');
                themeToggleIcon.classList.add('fa-moon');
            }
            if (mobileThemeToggleIcon) {
                mobileThemeToggleIcon.classList.remove('fa-sun');
                mobileThemeToggleIcon.classList.add('fa-moon');
            }
            if (mobileThemeToggleText) {
                mobileThemeToggleText.textContent = 'Dark Mode';
            }
        }
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.classList.contains('light') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Set initial state based on localStorage or system preferences
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(savedTheme);
}

// --- Main App Logic ---

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadAndRenderAll();

    // Handle deep linking for direct URLs/sharing
    handleDeepLinking();
    window.addEventListener('hashchange', handleDeepLinking);

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

    // Close image preview modal on backdrop click
    const imagePreviewModal = document.getElementById('image-preview-modal');
    if (imagePreviewModal) {
        imagePreviewModal.addEventListener('click', (e) => {
            if (e.target === imagePreviewModal) {
                closeImagePreview();
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
document.addEventListener('contextmenu', (e) => {
    if (localStorage.getItem('isAdmin') === 'true') return;
    e.preventDefault();
});
document.addEventListener('copy', (e) => {
    if (localStorage.getItem('isAdmin') === 'true') return;
    e.preventDefault();
});
document.addEventListener('cut', (e) => {
    if (localStorage.getItem('isAdmin') === 'true') return;
    e.preventDefault();
});
document.addEventListener('paste', (e) => {
    if (localStorage.getItem('isAdmin') === 'true') return;
    e.preventDefault();
});
document.addEventListener('keydown', (e) => {
    if (localStorage.getItem('isAdmin') === 'true') return;
    if (e.key === 'F12') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && ['I','J','C','i','j','c'].includes(e.key)) e.preventDefault();
    if (e.ctrlKey && ['U','u'].includes(e.key)) e.preventDefault();
});

// --- Admin Authentication Mode ---

function checkAdminMode() {
    if (localStorage.getItem('isAdmin') === 'true') {
        document.body.classList.add('admin-mode');
        document.body.classList.remove('no-copy');
    } else {
        document.body.classList.remove('admin-mode');
        document.body.classList.add('no-copy');
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
    // Utility helpers
    function pvGet(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } }
    function pvSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

    // Detect browser and OS
    function getBrowserAndOS() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let os = 'Unknown';

        // OS Detection
        if (/Windows/i.test(ua)) os = 'Windows';
        else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
        else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
        else if (/Android/i.test(ua)) os = 'Android';
        else if (/Linux/i.test(ua)) os = 'Linux';

        // Browser Detection
        if (/Edg/i.test(ua)) browser = 'Edge';
        else if (/Chrome/i.test(ua) && !/Chromium/i.test(ua)) browser = 'Chrome';
        else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
        else if (/Firefox/i.test(ua)) browser = 'Firefox';
        else if (/Trident/i.test(ua) || /MSIE/i.test(ua)) browser = 'IE';
        
        return { browser, os };
    }

    // Geolocation and Session setup
    async function initSession() {
        const ua = navigator.userAgent;
        const dev = /Mobi|Android/i.test(ua) ? 'Mobile' : /Tablet|iPad/i.test(ua) ? 'Tablet' : 'Desktop';
        const info = getBrowserAndOS();
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
        
        // Referrer
        const ref = document.referrer;
        let src = 'Direct';
        if (ref.includes('github')) src = 'GitHub';
        else if (ref.includes('linkedin')) src = 'LinkedIn';
        else if (ref.includes('google')) src = 'Google';
        else if (ref.includes('twitter') || ref.includes('x.com')) src = 'Twitter/X';
        else if (ref) {
            try {
                src = new URL(ref).hostname;
            } catch {
                src = 'Other';
            }
        }

        let sessionId = sessionStorage.getItem('pv_session_id');
        let sessions = pvGet('pv_sessions', []);

        if (!sessionId) {
            // New Session
            sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('pv_session_id', sessionId);

            const newSession = {
                id: sessionId,
                time: new Date().toISOString(),
                device: dev,
                browser: info.browser,
                os: info.os,
                source: src,
                location: {
                    city: 'Retrieving...',
                    country: 'Retrieving...',
                    countryCode: '',
                    timezone: tz,
                    ip: ''
                },
                duration: 0,
                pagesViewed: ['Home'],
                contactsClicked: 0
            };

            // Add to localStorage logs
            sessions.push(newSession);
            if (sessions.length > 500) sessions.shift(); // keep last 500
            pvSet('pv_sessions', sessions);

            // Fetch IP location details asynchronously
            try {
                const geoRes = await fetch('https://ipapi.co/json/');
                if (geoRes.ok) {
                    const geoData = await geoRes.json();
                    // Reload sessions to prevent race condition
                    const currentSessions = pvGet('pv_sessions', []);
                    const idx = currentSessions.findIndex(s => s.id === sessionId);
                    if (idx !== -1) {
                        currentSessions[idx].location = {
                            city: geoData.city || 'Unknown City',
                            country: geoData.country_name || 'Unknown Country',
                            countryCode: geoData.country_code || '',
                            timezone: geoData.timezone || tz,
                            ip: geoData.ip || ''
                        };
                        pvSet('pv_sessions', currentSessions);
                    }
                }
            } catch (err) {
                // Try fallback geo api
                try {
                    const fallbackRes = await fetch('https://freeipapi.com/api/json');
                    if (fallbackRes.ok) {
                        const fallbackData = await fallbackRes.json();
                        const currentSessions = pvGet('pv_sessions', []);
                        const idx = currentSessions.findIndex(s => s.id === sessionId);
                        if (idx !== -1) {
                            currentSessions[idx].location = {
                                city: fallbackData.cityName || 'Unknown City',
                                country: fallbackData.countryName || 'Unknown Country',
                                countryCode: fallbackData.countryCode || '',
                                timezone: tz,
                                ip: fallbackData.ipAddress || ''
                            };
                            pvSet('pv_sessions', currentSessions);
                        }
                    }
                } catch (fallbackErr) {
                    console.error('Fallback location service failed');
                    // Update location status from "Retrieving..." to "Unknown"
                    const currentSessions = pvGet('pv_sessions', []);
                    const idx = currentSessions.findIndex(s => s.id === sessionId);
                    if (idx !== -1) {
                        currentSessions[idx].location.city = 'Unknown City';
                        currentSessions[idx].location.country = 'Unknown Country';
                        pvSet('pv_sessions', currentSessions);
                    }
                }
            }
        }

        // Setup page engagement tracker (IntersectionObserver)
        const sectionMap = {
            'top': 'Home', 'About': 'About',
            'skills-section': 'Skills', 'experience': 'Experience',
            'project': 'Projects', 'Contact me': 'Contact'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const label = sectionMap[entry.target.id];
                    if (label) {
                        const currentSessions = pvGet('pv_sessions', []);
                        const idx = currentSessions.findIndex(s => s.id === sessionId);
                        if (idx !== -1) {
                            const views = currentSessions[idx].pagesViewed || [];
                            if (!views.includes(label)) {
                                views.push(label);
                                currentSessions[idx].pagesViewed = views;
                                pvSet('pv_sessions', currentSessions);
                            }
                        }
                    }
                }
            });
        }, { threshold: 0.2 });

        Object.keys(sectionMap).forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Track Contact Form Submissions
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                const currentSessions = pvGet('pv_sessions', []);
                const idx = currentSessions.findIndex(s => s.id === sessionId);
                if (idx !== -1) {
                    currentSessions[idx].contactsClicked = (currentSessions[idx].contactsClicked || 0) + 1;
                    pvSet('pv_sessions', currentSessions);
                }
            });
        }

        // Heartbeat duration updater
        const startTime = Date.now();
        const updateDuration = () => {
            const durationSec = Math.round((Date.now() - startTime) / 1000);
            const currentSessions = pvGet('pv_sessions', []);
            const idx = currentSessions.findIndex(s => s.id === sessionId);
            if (idx !== -1) {
                currentSessions[idx].duration = durationSec;
                pvSet('pv_sessions', currentSessions);
            }
        };

        // Update duration periodically and on page unload
        const interval = setInterval(updateDuration, 10000);
        window.addEventListener('beforeunload', () => {
            clearInterval(interval);
            updateDuration();
        });
    }

    // Run session tracking when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSession);
    } else {
        initSession();
    }
})();

