document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const successMsg = document.getElementById('success-msg');
    const submitBtn = registrationForm ? registrationForm.querySelector('button[type="submit"]') : null;
    const hiddenIframe = document.getElementById('gform_target_iframe');
    const specialtySelect = document.getElementById('specialty');
    const otherSpecialtyInput = document.getElementById('other_specialty_input');

    if (specialtySelect && otherSpecialtyInput) {
        specialtySelect.addEventListener('change', () => {
            if (specialtySelect.value === '__other_option__') {
                otherSpecialtyInput.disabled = false;
            } else {
                otherSpecialtyInput.disabled = true;
            }
        });
        // Initial state
        if (specialtySelect.value !== '__other_option__') {
            otherSpecialtyInput.disabled = true;
        }
    }

    let isSubmitted = false;
    function handleSubmissionSuccess() {
        if (!isSubmitted) return;
        
        if (registrationForm) {
            registrationForm.style.display = 'none';
        }
        if (successMsg) {
            successMsg.style.display = 'block';
            window.scrollTo({
                top: successMsg.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', () => {
            isSubmitted = true;

            // Make sure the other specialty field is enabled if __other_option__ was chosen
            if (specialtySelect && specialtySelect.value === '__other_option__' && otherSpecialtyInput) {
                otherSpecialtyInput.disabled = false;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing Registration...';
            }

            // Fallback timer: transitions the UI smoothly after Google Form processes the POST
            setTimeout(handleSubmissionSuccess, 1200);
        });
    }

    if (hiddenIframe) {
        hiddenIframe.addEventListener('load', () => {
            if (isSubmitted) {
                handleSubmissionSuccess();
            }
        });
    }
});
});

// --- Social Media Badge Generator Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profile-upload');
    const badgeCanvas = document.getElementById('badge-canvas');
    const badgePreview = document.getElementById('badge-preview');
    const previewContainer = document.getElementById('badge-preview-container');
    const downloadBtn = document.getElementById('download-badge-btn');
    const copyCaptionBtn = document.getElementById('copy-caption-btn');

    if (!fileInput || !badgeCanvas) return;

    const ctx = badgeCanvas.getContext('2d');
    
    // Default caption text for 2027
    const linkedInCaption = "I'm thrilled to announce that I will be attending the 2nd Ethiopian Minimally Invasive Surgery Conference (EMISC 2027) on January 25–29, 2027 in Addis Ababa! Looking forward to exploring sustainable minimally invasive surgery, connecting with incredible surgeons, and advancing MIS in Africa together. #I_Will_Be_Attending_EMISC2027 #MISAfrica #GlobalSurgery #SurgicalEducation";

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                generateBadge(img);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    function generateBadge(userImg) {
        // 1. Clear Canvas (1080x1080)
        ctx.clearRect(0, 0, 1080, 1080);

        // 2. Draw User Image (Center Crop to fit 1080x1080)
        const size = Math.min(userImg.width, userImg.height);
        const xOffset = (userImg.width - size) / 2;
        const yOffset = (userImg.height - size) / 2;
        
        ctx.drawImage(userImg, xOffset, yOffset, size, size, 0, 0, 1080, 1080);

        // 3. Draw Bottom Banner Overlay
        // Solid Marine Navy background with soft opacity
        ctx.fillStyle = 'rgba(8, 56, 76, 0.94)';
        ctx.fillRect(0, 820, 1080, 260);
        
        // Cerulean Blue accent line on top of banner
        ctx.fillStyle = '#4A96B7'; // Cerulean
        ctx.fillRect(0, 810, 1080, 10);

        // 4. Load and Draw Logo via Base64 to bypass CORS when running from file://
        const logoImg = new Image();
        logoImg.onload = () => {
            // Draw logo on bottom left
            const logoHeight = 160;
            const aspect = logoImg.width / logoImg.height;
            const logoWidth = logoHeight * aspect;
            
            ctx.drawImage(logoImg, 50, 870, logoWidth, logoHeight);

            // 5. Draw Text
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'right';
            
            // "I AM ATTENDING" Text
            ctx.font = 'bold 34px "Plus Jakarta Sans", "Inter", sans-serif';
            ctx.fillText('I AM ATTENDING', 1030, 895);
            
            // Hashtag Text
            ctx.fillStyle = '#A3CDE0'; // Sky Blue Accent
            ctx.font = 'bold 40px "Outfit", sans-serif';
            ctx.fillText('#I_Will_Be_Attending_EMISC2027', 1030, 950);
            
            // Subtitle
            ctx.fillStyle = '#EBF4F8'; // Frost Light Blue
            ctx.font = '24px "Plus Jakarta Sans", "Inter", sans-serif';
            ctx.fillText('2nd Ethiopian Minimally Invasive Surgery Conference', 1030, 995);

            // Dates & Location
            ctx.fillStyle = '#4A96B7'; // Cerulean Blue
            ctx.font = 'bold 22px "Plus Jakarta Sans", "Inter", sans-serif';
            ctx.fillText('January 25–29, 2027   |   Addis Ababa, Ethiopia', 1030, 1040);

            // 6. Update Preview
            const dataUrl = badgeCanvas.toDataURL('image/png');
            badgePreview.src = dataUrl;
            previewContainer.style.display = 'block';
        };
        // Use the embedded Base64 logo to avoid Canvas CORS taint errors on local files
        if (typeof LOGO_BASE64 !== 'undefined') {
            logoImg.src = LOGO_BASE64;
        } else {
            logoImg.src = 'assets/images/emisc_2027_logo.png';
        }
    }

    // Download Button Action
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const dataUrl = badgeCanvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'EMISC_2027_Badge.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    // Copy Caption Action
    if (copyCaptionBtn) {
        copyCaptionBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(linkedInCaption).then(() => {
                const originalText = copyCaptionBtn.innerHTML;
                copyCaptionBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyCaptionBtn.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy. Please try manually selecting and copying the text.');
            });
        });
    }
});
