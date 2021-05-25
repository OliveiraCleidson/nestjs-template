import { helloWorld } from '@/core/hello';

describe('firstTest', () => {
  let sut;
  beforeEach(() => {
    sut = helloWorld;
  });
  it('should be return phrase', () => {
    expect(sut()).toEqual('Welcome to Typescript Backend Template');
  });
  it('1 equal 1', () => {
    expect(1).toEqual(1);
  });

  it('1 not equal 1', () => {
    expect(1).not.toEqual(2);
  })

  it('should throw error', () => {
    function thError(){
      throw new Error('Este é um erro')
    }

    // Expect a function that throw a error
    expect(() => thError()).toThrowError()
    expect(thError).toThrowError()
  })

  it('should test a promise', async () => {
    async function promise1(){
      const pause = new Promise(resolve => setTimeout(resolve, 1e3))
      await pause
      return 'value1'
    }

    const promise2 = new Promise(resolve => setTimeout(() => resolve('value2'), 1e3*2))
    const promise3 = new Promise((_, reject) => setTimeout(() => reject(new Error('Este é um erro em uma promise')), 1e3*3))

    await expect(promise1()).resolves.toEqual('value1')
    await expect(promise2).resolves.toEqual('value2')
    // Error message isnt necessary
    await expect(promise3).rejects.toThrow('Este é um erro em uma promise')
  })

  it('should handle a custom error (promise)', async () => {
    class MyCustomError extends Error{
      name = 'My Custom Error'
      constructor(message:string){super(message)}
    }

    async function throwMyCustomError(message?:string){
      throw new MyCustomError(message ? message :'Meu erro personalizado')
    }

    await expect(throwMyCustomError()).rejects.toBeInstanceOf(MyCustomError)
    await expect(throwMyCustomError()).rejects.toThrowError(MyCustomError)
    await expect(throwMyCustomError()).rejects.toThrow('Meu erro personalizado')
    await expect(throwMyCustomError('mensagem customizada')).rejects.toThrow('mensagem customizada')
    // Verify the message
    await expect(throwMyCustomError('mensagem customizada')).rejects.not.toThrow('Meu erro personalizado')
  })

  it('fake method implementation', () => {
    const myMethod = {formatMessagge: (message:string) => `${message} - Metodo Real`} 

    expect(/Metodo Real$/.test(myMethod.formatMessagge('alguma mensagem'))).toEqual(true)

    myMethod.formatMessagge = jest.fn(() => 'Metodo Fake')

    expect(/Metodo Fake$/.test(myMethod.formatMessagge('fakezada'))).toEqual(true)
  })

  it('mockImplementation and Spy', () => {
    const myFakeClass = {
      getMaxGroups: () => 10
    }

    const spyGetMaxGroups = jest.spyOn(myFakeClass, 'getMaxGroups')
    myFakeClass.getMaxGroups()
    expect(spyGetMaxGroups).toHaveBeenCalled()
    expect(myFakeClass.getMaxGroups()).toEqual(10)

    spyGetMaxGroups.mockImplementationOnce(() => 16)
    expect(myFakeClass.getMaxGroups()).toEqual(16)
    
    expect(myFakeClass.getMaxGroups()).toEqual(10)
  })
});
