        const startButton = document.getElementById('start-quiz');
        const questionContainer = document.getElementById('question-container');
        const questionElement = document.getElementById('question');
        const answerButtonsElement = document.getElementById('answer-buttons');
        const nextButton = document.getElementById('next-button');
        const resultScreen = document.getElementById('result-screen');
        const scoreElement = document.getElementById('score');
        const restartButton = document.getElementById('restart-quiz');

        let currentQuestionIndex = 0;
        let score = 0;

        const questions = generateQuestions();

        startButton.addEventListener('click', startQuiz);
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            setNextQuestion();
        });
        restartButton.addEventListener('click', restartQuiz);

        function startQuiz() {
            startButton.parentElement.classList.add('hide');
            questionContainer.classList.remove('hide');
            setNextQuestion();
        }

        function setNextQuestion() {
            resetState();
            if (currentQuestionIndex < questions.length) {
                showQuestion(questions[currentQuestionIndex]);
            } else {
                showResult();
            }
        }

        function showQuestion(question) {
            questionElement.innerText = question.question;
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                button.addEventListener('click', () => selectAnswer(button, answer.correct));
                answerButtonsElement.appendChild(button);
            });
        }

        function resetState() {
            while (answerButtonsElement.firstChild) {
                answerButtonsElement.removeChild(answerButtonsElement.firstChild);
            }
            nextButton.classList.add('hide');
        }

        function selectAnswer(button, correct) {
            const selectedButton = document.querySelector('.selected');
            if (selectedButton) {
                selectedButton.classList.remove('selected');
            }
            if (correct) {
                button.classList.add('correct');
                score++;
            } else {
                button.classList.add('wrong');
            }
            Array.from(answerButtonsElement.children).forEach(btn => {
                btn.disabled = true;
            });
            nextButton.classList.remove('hide');
        }

        function showResult() {
            questionContainer.classList.add('hide');
            resultScreen.classList.remove('hide');
            scoreElement.innerText = `${score} out of ${questions.length}`;
        }

        function restartQuiz() {
            score = 0;
            currentQuestionIndex = 0;
            questions.splice(0, questions.length, ...generateQuestions());
            resultScreen.classList.add('hide');
            questionContainer.classList.remove('hide');
            setNextQuestion();
        }

        function generateQuestions() {
            const sampleQuestions = [
                { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris"], correct: 2 },
                { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter"], correct: 1 },
                { question: "What is the largest ocean on Earth?", answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"], correct: 2 },
                { question: "What is the smallest continent by land area?", answers: ["Australia", "Europe", "Antarctica"], correct: 0 },
                { question: "What is the chemical symbol for water?", answers: ["H2O", "O2", "CO2"], correct: 0 },
                { question: "What is the speed of light?", answers: ["299,792 km/s", "150,000 km/s", "300,000 km/s"], correct: 0 },
                { question: "Who wrote 'Romeo and Juliet'?", answers: ["William Shakespeare", "Jane Austen", "Charles Dickens"], correct: 0 },
                { question: "What is the hardest natural substance on Earth?", answers: ["Gold", "Iron", "Diamond"], correct: 2 },
                { question: "What is the currency of Japan?", answers: ["Yen", "Dollar", "Euro"], correct: 0 },
                { question: "Who was the first President of the United States?", answers: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"], correct: 0 },
            ];

            return sampleQuestions.sort(() => 0.5 - Math.random()).slice(0, 3).map(q => ({
                question: q.question,
                answers: q.answers.map((answer, index) => ({ text: answer, correct: index === q.correct }))
            }));
        }