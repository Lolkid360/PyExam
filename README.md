# AP CSP Exam Prep Application

This application is a multiple-choice question practice tool built with `tkinter` for AP Computer Science Principles exam preparation. It allows users to import a question bank from a CSV file, answer questions, and track their progress.  This was made by the instructor as a `.py` file, but I make it into a website.

## How to Use the Application

### 1. Importing a Question Bank

To use the application, you need to import a CSV file containing the question bank. The CSV file should have the following columns:

- `question`: The text of the question.
- `choice_1`: First answer choice.
- `choice_2`: Second answer choice.
- `choice_3`: Third answer choice.
- `answer`: The correct answer choice.

### Example CSV Format

```csv

question,choice_1,choice_2,choice_3,answer
"What does CPU stand for?",Central Processing Unit,Central Performance Unit,Central Processor Utility,Central Processing Unit
"Which of the following is a programming language?",HTML,HTTP,URL,HTML
"What is 2 + 2?",3,5,0,4
