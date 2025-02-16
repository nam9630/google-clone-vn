
    // Lấy các phần tử DOM
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const doodleButton = document.getElementById('doodle-button');
    const micIcon = document.querySelector('.mic-icon');

    // Hàm thực hiện tìm kiếm
    function performSearch() {
        const query = searchInput.value.trim(); // Lấy giá trị từ input và loại bỏ khoảng trắng thừa
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.location.href = searchUrl; // Chuyển hướng đến trang tìm kiếm của Google
        }
    }

    // Sự kiện khi nhấn nút "Tìm trên Google"
    searchButton.addEventListener('click', performSearch);

    // Sự kiện khi nhấn phím Enter trong ô tìm kiếm
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Sự kiện khi nhấn nút "Xem trang dầu tiên tìm được"
    doodleButton.addEventListener('click', function () {
        window.open('https://doodles.google/', '_blank'); // Mở trong tab mới
    });

    // Kiểm tra hỗ trợ trình duyệt cho nhận dạng giọng nói
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'vi-VN'; // Ngôn ngữ tiếng Việt

        // Xử lý kết quả nhận dạng giọng nói
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            performSearch(); // Tự động thực hiện tìm kiếm
        };

        // Xử lý lỗi nhận dạng giọng nói
        recognition.onerror = function (event) {
            console.error('Lỗi nhận dạng giọng nói:', event.error);
        };

        // Reset icon khi kết thúc nhận dạng giọng nói
        recognition.onend = function () {
            micIcon.style.color = '#5f6368';
            micIcon.textContent = 'mic';
        };
    }

    // Sự kiện khi nhấn nút micro
    micIcon.addEventListener('click', function () {
        if (!SpeechRecognition) {
            alert('Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói');
            return;
        }

        if (!recognition) return;

        try {
            recognition.start();
            micIcon.style.color = '#4285f4'; // Đổi màu khi đang ghi âm
            micIcon.textContent = 'mic'; // Đổi icon
        } catch (error) {
            alert('Vui lòng cho phép sử dụng microphone');
        }
    });
