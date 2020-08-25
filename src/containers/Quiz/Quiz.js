import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null,
		quiz: [
			{
				question: 'Кто был главным злодеем в фильме «Человек-муравей»?',
				rightAnswerId: 2,
				id: 1,
				answers: [
					{text: 'Оса', id: 1},
					{text: 'Желтый шершень', id: 2},
					{text: 'Скорпион', id: 3},
					{text: 'Дедпул', id: 4}
				]
			},
			{
				question: 'Как зовут альтер-эго Эмиля Блонского из «Невероятного Халка»?',
				rightAnswerId: 2,
				id: 2,
				answers: [
					{text: 'Таскмастер', id: 1},
					{text: 'Мерзость', id: 2},
					{text: 'Карнаж', id: 3},
					{text: 'Грязь', id: 4}
				]
			},
			{
				question: 'Над каким мстителем Локи имел временный контроль?',
				rightAnswerId: 1,
				id: 3,
				answers: [
					{text: 'Соколиный глаз', id: 1},
					{text: 'Стрела', id: 2},
					{text: 'Черная вдова', id: 3},
					{text: 'Халк', id: 4}
				]
			},
			{
				question: 'Как именуется страж Асгарда, которого Локи отправил на Землю, чтобы уничтожить Тора?',
				rightAnswerId: 3,
				id: 4,
				answers: [
					{text: 'Галактус', id: 1},
					{text: 'Натиск', id: 2},
					{text: 'Разрушитель', id: 3},
					{text: 'Давление', id: 4}
				]
			},
			{
				question: 'Как звучит второе имя Эрика «Киллмонгера» Стивенса?',
				rightAnswerId: 4,
				id: 5,
				answers: [
					{text: 'ВКаби', id: 1},
					{text: 'Зури', id: 2},
					{text: 'КГер', id: 3},
					{text: 'НДжадаки', id: 4}
				]
			},
			{
				question: 'Кто сыграл Обадая Стейна в первом «Железном человеке»?',
				rightAnswerId: 1,
				id: 6,
				answers: [
					{text: 'Джефф Бриджес', id: 1},
					{text: 'Сэм Рокуэл', id: 2},
					{text: 'Микки Рурк', id: 3},
					{text: 'Джексон Брайс', id: 4}
				]
			},
			{
				question: 'Как на самом деле зовут Стервятника из фильма «Человек-паук: Возвращение домой»?',
				rightAnswerId: 2,
				id: 7,
				answers: [
					{text: 'Джексон Брайс', id: 1},
					{text: 'Эндриан Тумс', id: 2},
					{text: 'Джеймс Браян', id: 3},
					{text: 'Аорон Девис', id: 4}
				]
			},
			{
				question: 'Какой питомец был у Ивана Ванко в «Железном человеке 2»?',
				rightAnswerId: 1,
				id: 8,
				answers: [
					{text: 'Попугай', id: 1},
					{text: 'Кошка', id: 2},
					{text: 'Собака', id: 3},
					{text: 'Крыса', id: 4}
				]
			},
			{
				question: 'Кто озвучил Дормамму в «Докторе Стрэндже»?',
				rightAnswerId: 2,
				id: 9,
				answers: [
					{text: 'Бред Питт', id: 1},
					{text: 'Бенедикт Камбербэтч', id: 2},
					{text: 'Мадс Миккельсон', id: 3},
					{text: 'Майкл Сталберг', id: 4}
				]
			},
			{
				question: 'К какой инопланетной расе относится Ронан Обвинитель?',
				rightAnswerId: 2,
				id: 10,
				answers: [
					{text: 'Фаланга', id: 1},
					{text: 'Крии', id: 2},
					{text: 'Скрулы', id: 3},
					{text: 'Марсиане', id: 4}
				]
			},		
			{
				question: 'Кто сыграл Малекита Проклятого в фильме «Тор 2: Царство тьмы»?',
				rightAnswerId: 4,
				id: 11,
				answers: [
					{text: 'Мэт Смит', id: 1},
					{text: 'Кеннет Брана', id: 2},
					{text: 'Майкл Сталберг', id: 3},
					{text: 'Кристофер Экклстон', id: 4}
				]
			}
		]
	}

	onAnswerClickHandler = answerId => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if (this.state.answerState[key] === 'success') {
				return
			}
		}
		const question = this.state.quiz[this.state.activeQuestion]
		const results = this.state.results

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'
			}

			this.setState({
				answerState: {[answerId]: 'success'},
				results
			})

			const timeout = window.setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				window.clearTimeout(timeout)
			}, 1000)
		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: {[answerId]: 'error'},
				results
			})
		}
	}

	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}
	retryHandler = () => {
		this.setState({
			activeQuestion: 0,
			answerState: null,
			isFinished: false,
			results: {}
		})
	}
	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Как хорошо вы знаете злодеев киновселенной Marvel?</h1>
					{
						this.state.isFinished 
						? <FinishedQuiz 
								results={this.state.results}
								quiz={this.state.quiz}
								onRetry={this.retryHandler}
							/> 
						: <ActiveQuiz 
								answers={this.state.quiz[this.state.activeQuestion].answers}
								question={this.state.quiz[this.state.activeQuestion].question}
								onAnswerClick={this.onAnswerClickHandler}
								quizLenght={this.state.quiz.length}
								answerNumber={this.state.activeQuestion + 1}
								state={this.state.answerState}
							/>
					}
				</div>
			</div>
		)
	}
}

export default Quiz