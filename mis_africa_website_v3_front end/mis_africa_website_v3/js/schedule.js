document.addEventListener('DOMContentLoaded', () => {
    loadSchedule();
    loadPanelists();
});

const scheduleData = [
  {
    "date": "April 13-14, 2026",
    "events": [
      {
        "time": "Full Day",
        "title": "Basic Laparoscopy Training for Surgical Residents",
        "location": "Addis Ababa, Ethiopia",
        "speaker": "MIS Africa - Drs. Segni, Filagot and Philimon",
        "description": "A comprehensive two-day hands-on training program focused on basic laparoscopic surgical techniques for residents."
      }
    ]
  },
  {
    "date": "April 15, 2026",
    "events": [
      {
        "time": "Full Day",
        "title": "Live Surgeries & Surgical Telecasts",
        "location": "Addis Ababa, Ethiopia",
        "speaker": "MIS Africa - Dr. Efeson",
        "description": "Experience live surgical procedures broadcast directly from the Operating Room (OR) with expert insights and real-time commentary."
      }
    ]
  },
  {
    "date": "April 16, 2026",
    "events": [
      {
        "time": "Morning",
        "title": "Live Surgeries & Surgical Telecasts",
        "location": "Addis Ababa, Ethiopia",
        "speaker": "MIS Africa - Dr. Efeson",
        "description": "Experience live surgical procedures broadcast directly from the Operating Room (OR) with expert insights and real-time commentary."
      },
      {
        "time": "Afternoon",
        "title": "Becoming an Effective Surgical Educator in Modern Surgical Training",
        "location": "Addis Ababa, Ethiopia",
        "speaker": "Dr. David Jeffcoach",
        "description": "A specialized half-day workshop focusing on advanced pedagogical techniques and strategies for surgical educators."
      }
    ]
  },
  {
    "date": "April 17, 2026",
    "events": [
      {
        "time": "Full Day",
        "title": "Main Conference",
        "location": "Addis Ababa, Ethiopia",
        "speaker": "MIS Africa",
        "description": "The 1st Ethiopian Minimally Invasive Surgery Conference. A full-day meeting featuring expert panels, research presentations, and networking."
      }
    ]
  }
];

const panelistsData = [
    {
        "name": "Dr. Efeson Thomas",
        "role": "MD, FACS, FCS(ECSA), Assistant professor of surgery",
        "institution": "Addis Ababa, Ethiopia",
        "image": "assets/images/dr_efeson_thomas.jpg",
        "bio": "General, Colorectal, Minimal Access Gastrointestinal Surgery and Endoscopy, Co-Founder and CEO at MIS Africa, Jimma University, Pan-African Academy of Christian Surgeons(PAACS), Senadhipan Institute of Medical Sciences (SIMS), 9 years of Experience."
    },
    {
        "name": "Dr. Filagot Bizuneh",
        "role": "MD, FCS-ECSA, General Surgery",
        "institution": "Addis Ababa, Ethiopia",
        "image": "assets/images/dr_filagot_bizuneh.jpg",
        "bio": "Dr. Filagot Bizuneh (MD, FCS-ECSA, General Surgery) – Co-founder and Vice Chairman of the Board of Directors at MIS Africa, Assistant Professor of Surgery and Postgraduate Surgery Program Director."
    },
    {
        "name": "Dr. Segni Bekele",
        "role": "MD, FCS(ECSA), MIS Africa Co-founder and Board chair",
        "institution": "Negele Arsi General Hospital and Medical College",
        "image": "assets/images/dr_segni_bekele.png",
        "bio": "Consultant general surgeon and FLS certified laparoscopic surgeon over 9 years of Experience, Former medical school head at Negele Arsi General Hospital and Medical College."
    },
    {
        "name": "Dr. Surafel Mulatu",
        "role": "MD, FACS, FCS-ECSA, Assistant Professor of Surgery",
        "institution": "Yekatit 12 Hospital Medical College",
        "image": "assets/images/dr_surafel_mulatu.jpg",
        "bio": "Laparoscopic and Colorectal Surgery, Founder and CEO at GoLap, Chair of Committee on Surgical Quality, The Pan African Academy of Christian Surgeons (PAACS), Asan Medical Center (AMC), 15 years of experience."
    },
    {
        "name": "Dr. Feven Mekonenn",
        "role": "General Surgeon, Global Health Advocate, and Healthcare Leader",
        "institution": "Ayder Comprehensive Specialized Hospital, Mekele, Ethiopia",
        "image": "assets/images/dr_feven_mekonenn.jpg",
        "bio": "Minimal Invasive Surgery (MIS) Integration, ERAS Protocol Implementation, Surgical Education and Mentorship, Health Equity Advocacy, 2026 Spring Global Surgery Slingshot Cohort."
    },
    {
        "name": "Dr. Henok Teshome",
        "role": "MD, FACS, Associate Professor of Surgery",
        "institution": "St. Paul's Hospital Millennium Medical College, Addis Ababa, Ethiopia",
        "image": "assets/images/dr_henok_teshome.jpg",
        "bio": "Hepatobiliary and Pancreatic (HPB) Surgery, Consultant General Surgeon, Surgical Education and Competence, Fellow of the American College of Surgeons (FACS)."
    },
    {
        "name": "Dr. Girma Ababi",
        "role": "MD, Consultant Pathologist, Associate Professor, Founder & CEO at Liyana Healthcare PLC, Vice President at Ethiopian Healthcare Federation",
        "institution": "Liyana Healthcare PLC",
        "image": "assets/images/dr_girma_ababi.jpg",
        "bio": "Dr. Girma is a visionary healthcare leader with over 20 years of medical experience and 14 years in healthcare investment and innovation. As the Founder and CEO of Liyana Healthcare, he manages a diverse portfolio including the Yanet Chain of Hospitals, pharmaceutical manufacturing, and medical education. He serves as a key policy advisor to the Ethiopian Ministry of Health and a member of the National Regulatory Committee. Recognized for his extraordinary achievements in healthcare leadership, he currently drives systemic change as the Vice President of the Ethiopian Healthcare Federation."
    },
    {
        "name": "Dr. Dan Poenaru",
        "role": "MD, PhD, CM, Professor of Pediatric Surgery",
        "institution": "McGill University & McGill University Health Centre (MUHC)",
        "image": "assets/images/dr_dan_poenaru.jpg",
        "bio": "Dr. Poenaru is a world-renowned pediatric surgeon and investigator specializing in global surgery, patient-centered care, and the integration of AI and VR in surgical practice. A founding member of the Global Initiative for Children’s Surgery, he has authored extensive research on surgical outcomes and medical education. He directs the CommiSur Lab, which focuses on enhancing clinical communication and democratizing trauma simulation through digital health innovation. In recognition of his profound contributions to global pediatric surgical equity, he was inducted into the Order of Canada in 2024."
    }
];

async function loadSchedule() {
    const container = document.getElementById('schedule-container');
    if (!container) return;

    try {
        const response = await fetch('data/schedule.json');
        const data = await response.json();
        container.innerHTML = ''; // Clear loading

        data.forEach(day => {
            const daySection = document.createElement('div');
            daySection.className = 'schedule-day';
            daySection.innerHTML = `<h3 class="day-title">${day.date}</h3>`;

            const eventsList = document.createElement('div');
            eventsList.className = 'events-list';

            day.events.forEach(item => {
                const scheduleItem = document.createElement('div');
                scheduleItem.className = 'schedule-item';
                scheduleItem.innerHTML = `
                    <div class="time">${item.time}</div>
                    <div class="details">
                        <h3>${item.title}</h3>
                        ${item.avatars && item.avatars.length > 0 ? `
                        <div class="speaker-avatars">
                            ${item.avatars.map(av => `
                                <div class="avatar-bubble" onclick="openEventModal('${escape(item.title)}', '${escape(item.location || '')}', '${escape(item.description || '')}', '${escape(item.time)}')">
                                    <img src="${av.image}" alt="${av.name}" title="${av.name}">
                                </div>
                            `).join('')}
                        </div>` : ''}
                        ${item.speaker ? `<p class="speaker"><i class="fas fa-user"></i> ${item.speaker}</p>` : ''}
                        ${item.avatars && item.avatars.length > 0 ? `<p class="click-hint" style="font-size: 0.8rem; color: #888; font-style: italic; margin-top: 5px;">* Click on an avatar to view details and location</p>` : ''}
                        
                        ${/* Fallbacks for MIS Africa single line events */ ''}
                        ${(!item.avatars || item.avatars.length === 0) && item.location ? `<p class="location" style="margin-top:10px;"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>` : ''}
                        ${(!item.avatars || item.avatars.length === 0) && item.description ? `<p class="description">${item.description}</p>` : ''}
                    </div>
                `;
                eventsList.appendChild(scheduleItem);
            });

            daySection.appendChild(eventsList);
            container.appendChild(daySection);
        });
    } catch (error) {
        console.error('Error loading schedule:', error);
        container.innerHTML = '<p class="error">Failed to load schedule.</p>';
    }
}

async function loadPanelists() {
    const container = document.getElementById('panelists-container');
    try {
        const response = await fetch('data/panelists.json');
        const data = await response.json();

        container.innerHTML = ''; // Clear loading

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'panelist-card';
            const imagePath = item.image;

            card.innerHTML = `
                <div class="panelist-img" onclick="openImageModal('${item.image}', '${item.name}')" style="cursor: zoom-in;">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<i class="fas fa-user-md fa-3x" style="color: var(--primary-color); margin-top: 20px;"></i>'}
                </div>
                <div class="panelist-info">
                    <h3>${item.name}</h3>
                    <p class="role">${item.role}</p>
                    <p class="institution">${item.institution}</p>
                    ${item.bio ? `<p class="panelist-bio">${item.bio}</p>` : ''}
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading panelists:', error);
        container.innerHTML = '<p class="error">Failed to load panelists.</p>';
    }
}

// Modal functionality for event details
window.openEventModal = function(title, location, desc, time) {
    let modal = document.getElementById('event-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'event-modal';
        modal.className = 'custom-modal';
        document.body.appendChild(modal);

        // Allow closing by clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="document.getElementById('event-modal').style.display='none'">&times;</span>
            <h3 style="color: var(--primary-color); margin-bottom: 10px;">${unescape(title)}</h3>
            <p style="margin-bottom: 5px;"><strong><i class="fas fa-clock" style="color:var(--accent-color)"></i> Time:</strong> ${unescape(time)}</p>
            ${location && location !== '' ? `<p style="margin-bottom: 5px;"><strong><i class="fas fa-map-marker-alt" style="color:var(--accent-color)"></i> Location:</strong> ${unescape(location)}</p>` : ''}
            ${desc && desc !== '' ? `<p style="margin-top: 15px; line-height: 1.5;">${unescape(desc)}</p>` : ''}
        </div>
    `;
    modal.style.display = 'flex';
}

// Lightbox for speaker images
window.openImageModal = function(src, name) {
    let modal = document.getElementById('image-lightbox');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-lightbox';
        modal.className = 'custom-modal lightbox';
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-btn')) {
                modal.style.display = 'none';
            }
        });
    }

    modal.innerHTML = `
        <div class="modal-content lightbox-content">
            <span class="close-btn">&times;</span>
            <img src="${src}" alt="${name}" class="lightbox-img">
            <div class="lightbox-caption">${name}</div>
        </div>
    `;
    modal.style.display = 'flex';
}

// Toggle EMISC 2026 Archive Folder Drawer
window.toggleGalleryFolder = function() {
    const drawer = document.getElementById('gallery-folder-drawer');
    const btnText = document.getElementById('toggle-folder-text');
    const btnIcon = document.getElementById('toggle-folder-icon');
    if (!drawer) return;

    const isHidden = drawer.style.display === 'none' || !drawer.style.display;
    if (isHidden) {
        drawer.style.display = 'block';
        if (btnText) btnText.textContent = 'Close Photo Folder';
        if (btnIcon) {
            btnIcon.classList.remove('fa-folder-open');
            btnIcon.classList.add('fa-folder');
        }
        drawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        drawer.style.display = 'none';
        if (btnText) btnText.textContent = 'Open Photo Folder (17 Photos)';
        if (btnIcon) {
            btnIcon.classList.remove('fa-folder');
            btnIcon.classList.add('fa-folder-open');
        }
    }
};
