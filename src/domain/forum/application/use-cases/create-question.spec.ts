import { expect } from 'vitest'

import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoriesQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase // system-under-test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoriesQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoriesQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'New Question',
      content: 'Content of question',
    })

    expect(question.id).toBeTruthy()
  })
})
