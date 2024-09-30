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

        // Ambil jawaban dan feedback dari localStorage jika ada
        const savedAnswer = localStorage.getItem(`answer${index}`);
        const feedback = localStorage.getItem(`feedback${index}`) || "";

        questionElement.innerHTML = `
            <h3>${index + 1}. ${quizItem.question}</h3>
            <label>
                <input type="radio" name="answer${index}" value="a" ${savedAnswer === "a" ? "checked" : ""} ${feedback ? "disabled" : ""}>
                ${quizItem.a}
            </label>
            <label>
                <input type="radio" name="answer${index}" value="b" ${savedAnswer === "b" ? "checked" : ""} ${feedback ? "disabled" : ""}>
                ${quizItem.b}
            </label>
            <label>
                <input type="radio" name="answer${index}" value="c" ${savedAnswer === "c" ? "checked" : ""} ${feedback ? "disabled" : ""}>
                ${quizItem.c}
            </label>
            <label>
                <input type="radio" name="answer${index}" value="d" ${savedAnswer === "d" ? "checked" : ""} ${feedback ? "disabled" : ""}>
                ${quizItem.d}
            </label>
            <p class="feedback" id="feedback${index}">${feedback}</p>
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
        resultContainer.innerHTML = `<h2>Lu udah ngerjain ini, lu udh gabisa ngerjain lagi.</h2>`;
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
            localStorage.setItem(`feedback${index}`, "Benar! 🎉");
        } else {
            feedbackElement.innerHTML = `<span style="color: red;">Salah! 😢</span><br><span style="color: red;">Jawaban lu salah, berarti yang benar sisa 3 jawaban. Pilihlah 3 jawaban di antara itu untuk nanti lu jawab di ujian Moodle. Belajar yang bener ya, gw ga ngasih jawaban, gw hanya kasih tau salah atau benar.</span>`;
            localStorage.setItem(`feedback${index}`, `<span style="color: red;">Salah! 😢</span><br><span style="color: red;">Jawaban lu salah, berarti yang benar sisa 3 jawaban. Pilihlah 3 jawaban di antara itu untuk nanti lu jawab di ujian Moodle. Belajar yang bener ya, gw ga ngasih jawaban, gw hanya kasih tau salah atau benar.</span>`);
        }
    });

    // Simpan bahwa pengguna sudah menyelesaikan quiz
    localStorage.setItem('quizCompleted', 'true');

    resultContainer.innerHTML = `<h2>Skor Anda: ${score} dari ${quizData.length}</h2>`;
    resultContainer.innerHTML += `<h2>Lu udah ngerjain ini, lu udh gabisa ngerjain lagi.</h2>`;
});

// Load quiz saat halaman dimuat
loadQuiz();
















