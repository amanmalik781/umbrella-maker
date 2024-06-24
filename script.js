document.addEventListener('DOMContentLoaded', function () {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const umbrellaImage = document.getElementById('umbrella-image');
    const logoUpload = document.getElementById('logo-upload');
    const logoImage = document.getElementById('logo-image');
    const loaderImage = document.getElementById('loader-image');
    const loaderImageSmall = document.getElementById('loader-image-small');
    const uploadButton = document.getElementById('upload-button');
    const uploadIcon = document.getElementById('upload-icon');
    const deleteLogoIcon = document.getElementById('delete-logo-icon');
    const uploadButtonText = document.getElementById('upload-button-text');

    let loaderColor = 'blue';
    const backgroundColors = {
        blue: 'rgb(230, 246, 252)',
        yellow: 'rgb(255, 250, 237)',
        pink: 'rgb(255, 230, 242)'
    };

    const buttonColors = {
        blue: 'rgb(46, 181, 230)',
        yellow: 'rgb(255, 209, 71)',
        pink: 'rgb(217, 50, 139)'
    };

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function () {
            loaderColor = swatch.getAttribute('data-color');
            // hide umbrella
            umbrellaImage.style.display = 'none';
            // display loader
            loaderImage.style.display = 'initial';
            showLoader(buttonColors?.[loaderColor]);
            // hide logo if present
            if (logoImage) {
                logoImage.style.display = 'none';
            }
            // change background color
            document.body.style.backgroundColor = backgroundColors?.[loaderColor];
            // change upload button color
            uploadButton.style.backgroundColor = buttonColors?.[loaderColor];
            setTimeout(() => {
                // display updated umbrella color
                umbrellaImage.src = `assets/${loaderColor}_umbrella.png`;
                umbrellaImage.style.display = 'initial';
                // hide loader
                loaderImage.style.display = 'none';
                hideLoader();
                // display logo if present
                if (logoImage?.src?.length > 32) {
                    logoImage.style.display = 'initial';
                }
            }, 1000);

            // Remove the 'selected' class from all swatches
            colorSwatches.forEach(s => s.classList.remove('selected'));

            // Add the 'selected' class to the clicked swatch
            swatch.classList.add('selected');
        });
    });

    uploadButton.addEventListener('click', () => {
        logoUpload.click();
    });

    logoUpload.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            // read file from system
            const reader = new FileReader();
            const fileName = logoUpload.files[0].name;
            // display loader
            loaderImage.style.display = 'initial';
            showLoader(buttonColors?.[loaderColor]);
            // display upload button loader
            if (loaderImageSmall) {
                loaderImageSmall.style.display = 'initial';
            }
            // hide umbrella image and upload logo in button
            umbrellaImage.style.display = 'none';
            uploadIcon.style.display = 'none';
            // hide logo if present
            if (logoImage) {
                logoImage.style.display = 'none';
            }
            reader.onload = function (e) {
                setTimeout(() => {
                    // display uploaded logo
                    if (logoImage) {
                        logoImage.src = e.target.result;
                        logoImage.style.display = 'initial';
                    }
                    // display umbrella
                    umbrellaImage.style.display = 'initial';
                    // hide loader
                    loaderImage.style.display = 'none';
                    hideLoader();
                    // hide loader inside button
                    if (loaderImageSmall) {
                        loaderImageSmall.style.display = 'none';
                    }
                    // display upload logo again
                    uploadIcon.style.display = 'initial';
                    // display the delete logo icon
                    deleteLogoIcon.style.visibility = 'visible';
                    // change the text inside the button to the file name
                    uploadButtonText.textContent = fileName;
                }, 5000);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file (PNG or JPG).');
        }
    });

    deleteLogoIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop event bubbling
        logoImage.src = '';
        logoImage.style.display = 'none';
        uploadButtonText.textContent = 'UPLOAD LOGO';
        deleteLogoIcon.style.visibility = 'hidden';
        logoUpload.value = '';
    });

    function showLoader(color = buttonColors?.[loaderColor]) {
        fetch('assets/loader_icon.svg') // Path to loader SVG file
            .then(response => response.text())
            .then(svg => {
                // change loader color acc to umbrella color
                const coloredSvg = svg.replace(/currentColor/g, color);
                const svgBlob = new Blob([coloredSvg], { type: 'image/svg+xml' });
                const svgUrl = URL.createObjectURL(svgBlob);
                loaderImage.src = svgUrl;
                loaderImage.classList.add('rotate');
                loaderImageSmall.classList.add('rotate');
            });
    }

    function hideLoader() {
        loaderImage.classList.remove('rotate');
        loaderImageSmall.classList.add('rotate');
    }
});
