document.addEventListener('DOMContentLoaded', function () {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const umbrellaImage = document.getElementById('umbrella-image');
    const logoUpload = document.getElementById('logo-upload');
    // const logoImage = document.getElementById('logo-image');
    const loaderImage = document.getElementById('loader-image');
    const uploadButton = document.getElementById('upload-button');

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
            const color = swatch.getAttribute('data-color');
            loaderImage.style.display = 'block';
            umbrellaImage.style.display = 'none';
            // logoImage.style.display = 'none';
            document.body.style.backgroundColor = backgroundColors?.[color];
            uploadButton.style.backgroundColor = buttonColors?.[color];
            setTimeout(() => {
                umbrellaImage.src = `assets/${color}_umbrella.png`;
                umbrellaImage.style.display = 'block';
                loaderImage.style.display = 'none';
                // if (logoImage.src) {
                //     logoImage.style.display = 'block';
                // }
            }, 1000);
        });
    });

    uploadButton.addEventListener('click', () => {
        logoUpload.click();
    });

    logoUpload.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            loaderImage.style.display = 'block';
            umbrellaImage.style.display = 'none';
            // logoImage.style.display = 'none';
            reader.onload = function (e) {
                setTimeout(() => {
                    // logoImage.src = e.target.result;
                    // logoImage.style.display = 'block';
                    umbrellaImage.style.display = 'block';
                    loaderImage.style.display = 'none';
                }, 5000);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file (PNG or JPG).');
        }
    });
});
