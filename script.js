const quizData = [
    {
        question: "Apa ibukota Indonesia?",
        a: "Jakarta",
        b: "Bali",
        c: "Bandung",
        d: "Surabaya",
        correct: "a"
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        a: "Soekarno",
        b: "Suharto",
        c: "Jokowi",
        d: "B.J. Habibie",
        correct: "a"
    },
    {
        question: "Apa warna bendera Indonesia?",
        a: "Merah dan Putih",
        b: "Biru dan Putih",
        c: "Merah dan Kuning",
        d: "Hijau dan Putih",
        correct: "a"
    }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');

let score = 0;

function loadQuiz() {
    quizContainer.innerHTML = ''; // Bersihkan quiz container

    quizData.forEach((quizItem, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        // Ambil jawaban dari localStorage jika ada
        const savedAnswer = localStorage.getItem(`answer${index}`);

        questionElement.innerHTML = `
            <h3>${index + 1}. ${quizItem.question}</h3>
            <label>
                <input type="radio" name="answer${index}" value="a" ${savedAnswer === "a" ? "checked" : ""}>
                ${quizItem.a}
            </label>
            <label>
                <input type="radio" name="answer${index}" value="b" ${savedAnswer === "b" ? "checked" : ""}>
                ${quizItem.b}
            </label>
            <label>
                <input type="radio" name="answer${index}" value="c" ${savedAnswer === "c" ? "checked" : ""}>
                ${quizItem.c}
            </label>
            <label>
                <input type="radio" name="answer${index}" value="d" ${savedAnswer === "d" ? "checked" : ""}>
                ${quizItem.d}
            </label>
            <p class="feedback" id="feedback${index}"></p>
        `;

        quizContainer.appendChild(questionElement);

        // Tambahkan event listener untuk menyimpan jawaban saat dipilih
        questionElement.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', () => {
                localStorage.setItem(`answer${index}`, input.value);
            });
        });
    });
}

function getSelectedAnswers() {
    return quizData.map((_, index) => {
        const answers = document.querySelectorAll(`input[name="answer${index}"]`);
        let answer;
        answers.forEach((answerEl) => {
            if (answerEl.checked) {
                answer = answerEl.value;
            }
        });
        return answer;
    });
}

submitBtn.addEventListener('click', () => {
    // Cek jika pengguna sudah mengerjakan
    if (localStorage.getItem('quizCompleted')) {
        resultContainer.innerHTML = `<h2>Anda sudah mengerjakan quiz ini. Silakan ganti perangkat jika ingin mengerjakan lagi.</h2>`;
        return;
    }

    const answers = getSelectedAnswers();
    score = 0; // Reset score

    answers.forEach((answer, index) => {
        const feedbackElement = document.getElementById(`feedback${index}`);
        if (answer === quizData[index].correct) {
            score++;
            feedbackElement.innerText = "Benar! 🎉";
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerHTML = `<span style="color: red;">Salah! 😢</span><br><span style="color: red;">Jawaban lu salah, berarti yang benar sisa 3 jawaban. Pilihlah 3 jawaban di antara itu untuk nanti lu jawab di ujian Moodle. Belajar yang bener ya, gw ga ngasih jawaban, gw hanya kasih tau salah atau benar.</span>`;
        }
    });

    // Simpan bahwa pengguna sudah menyelesaikan quiz
    localStorage.setItem('quizCompleted', 'true');

    resultContainer.innerHTML = `<h2>Skor Anda: ${score} dari ${quizData.length}</h2>`;
});

// Load quiz saat halaman dimuat
loadQuiz();














