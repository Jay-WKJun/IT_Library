# 디자인 패턴

디자인 패턴에 대해서 정리합니다!

## 디자인 패턴을 알아야하는 이유

> 디자인 패턴은 검증 받은 객체지향 경험의 산물입니다.

위의 이유 자체만으로도 디자인 패턴을 반드시 배워야겠지만, 그 외에도 많은 디자인 패턴을 알면 좋은 점과 그 필요성을 알아보겠습니다!

### 생산성과 더 본질적인 시스템 설계 사고 능력 향상

- 팀 내 소통을 원활하게 해 생산성을 극대화 할 수 있다.

나를 구독하는 모든 객체를 추적할 수 있고, 새로운 데이터가 들어올 때마다, 구독한 객체들에게 변경되었다고 메세지를 보내 줄 수 있는 패턴! 그리고 구독과 취소도 마음대로 할 수 있는 패턴!

위 설명은 **옵저버 패턴**의 설명입니다. 패턴을 안다면 단 한단어로 아주 간단히 설명 가능합니다.

- 패턴을 알기에 그 너머의 아케텍처를 생각하는 수준도 끌어올려줍니다.

각 패턴의 장단점을 알고 있기 때문에 자질구레한 패턴의 레벨을 넘어 핵심적인 시스템 아키텍쳐를 더 깊이 고민할 수 있게 됩니다.

### 정확하고 빠른 기술 이해와 더 적절한 기술 사용

- 라이브러리나 프레임워크들도 디자인 패턴을 사용하기 때문에 어떠한 새로운 기술이 나와도 이해가 빨라진다.

리액트 또한 최신 라이브러리이지만, 옵저버 패턴을 따르고 있다. 따라서 해당 패턴을 이해한다면 내가 사용하는 라이브러리나 프레임워크를 금방 이해하고 적절히 사용할 수 있을 것입니다.

- 라이브러리나 프레임워크를 사용한다고 해도, 우리 시스템에 디자인 패턴을 적용해주는 것이 아니기 때문에, 직접 패턴을 적용시켜줄 필요가 있다.

라이브러리나 프레임워크를 통해 편리하게 개발한다고 해도, 적절히 사용하는 것은 결국 프로그래머의 몫입니다.

따라서, 디자인 패턴을 익혀둘 필요가 있습니다!

### 디자인 패턴은 시스템에 생명을 불어넣어준다.

- 객체지향 기초 지식만으로는 부족합니다.

따라서 객체지향 디자인 패턴을 통해 시스템과 코드의 재사용성, 확장성, 관리의 용이성을 확보할 수 있습니다!

# 옵저버 패턴

Observer는 관찰자라는 의미로 어떤 하나의 주제(Subject) 객체를 여러 관찰자(Observer)들이 관여합니다.

그리고 주제(Subject)객체가 바뀌었을 때, 그 사실을 등록된 모든 관찰자들에게 알려주는 패턴입니다.

굉장히 자주 사용되는 패턴으로 프론트엔드 분야에서 아주 유명한 'React.js' 라이브러리가 이 패턴을 사용하고 있습니다.

(MobX도 해당 패턴을 사용하고 있고 여기서 발전된 Flux 패턴을 사용하는 Redux가 있습니다.)

## 옵저버 패턴을 사용하지 않았을 때의 코드

뭔가 설명을 하려고 했는데, 역시 개발자는 코드가 있어야 제대로 설명 할 수 있는 것 같습니다!

그럼 상황을 설정하고 코드를 만들어보겠습니다. (TypeScript 코드로 진행하겠습니다.)

실시간으로 바뀌는 weather 정보를 여타 다른 단말기의 Display에 표시해야 한다고 가정하겠습니다.

먼저 weather 객체와 단말기 Display 객체를 만들어보겠습니다.

```typescript
class Weather {
  temp: number;
  rain: boolean;
  humidity: number;

  constructor(temp, rain, humidity) {
    this.temp = temp;
    this.rain = rain;
    this.humidity = humidity;
  }

  setWeather(temp, rain, humidity) {
    this.temp = temp;
    this.rain = rain;
    this.humidity = humidity;
  }
}

class Display {
  display: {
    temp: number
    rain: boolean
    humidity: number
  }

  constructor() {
    display = {};
  }

  setDisplay(temp, rain, humidity) {
    this.display = {
      temp,
      rain,
      humidity,
    };
  }
}
```

위 class를 토대로 Weather의 내용이 변할 때마다 Display들에게 해당 내용을 전달하는 로직을 만들어보겠습니다.

Weather의 내용이 변하는 순간에 Display들에게 내용을 알려야 하므로 setWeather 함수에 Display들에게 데이터를 넘겨주는 형식으로 하면 될 것 같네요!

```typescript
const deviceA = new Display();
const deviceB = new Display();
const deviceC = new Display();

// Weather class의 setWeather 메소드입니다.
setWeather(temp, rain, humidity) {
  this.temp = temp;
  this.rain = rain;
  this.humidity = humidity;

  deviceA.setDisplay(temp, rain, humidity);
  deviceB.setDisplay(temp, rain, humidity);
  deviceC.setDisplay(temp, rain, humidity);
}
```

이제 setWeather로 날씨정보를 변경하면 Display들에게 날씨 정보를 넘겨 줄 수 있습니다!

하지만,,, 여기서 Device가 늘어난다면...? 직접 코드를 다시 고쳐줘야합니다.

그렇게 모든 Display들을 **직접 손으로 대응**해줘야 합니다... 여간 귀찮은 일이 아닙니다.

게다가 **프로그램 실행중에 Display가 추가 되었을 경우 전혀 대응 할 수 없습니다.**

하지만, 여기서 중요한 공통점이 보입니다. 모든 Display들은 setDisplay라는 하나의 method로 구독한 내용을 갱신합니다.

여기서 힌트를 얻어 <u>**구독자들이 반드시 가져야하는 메소드 하나만을 정의하고 이를 통해서만 구독할 수 있다면,**</u>

<u>**구독자의 type이 어떻든 사용할 수 있어, 변경에 유연한 코드를 만들 수 있습니다!**</u>

코드로 적용해보겠습니다!

```typescript
// 구독하기 위해선 가져야 하는 method를 정의한 인터페이스입니다.
interface Observer {
  // 잠깐,,, update의 argument를 정의해버리면, 해당 데이터를 사용하는 객체에서 밖에 사용 못하는데...?
  update: (temp: number, rain: boolean, humidity: number) => void
}

// Display는 Observer의 구현체이기 때문에 반드시 observer 메소드를 가지게 됩니다. 따라서 구독할 수 있습니다.
// 이는 Display 뿐만 아니라 Observer를 구현하는 어떤 객체도 가능합니다!
class Display implements Observer {
  id: number
  display: {
    temp: number
    rain: boolean
    humidity: number
  }

  setDisplay(temp, rain, humidity) {
    this.display = {
      temp,
      rain,
      humidity,
    };
  }

  update(temp, rain, humidity) {
    setDisplay(temp, rain, humidity);
  }
}

// 옵져버를 받는 객체가 반드시 가져야 할 메소드를 정의합니다.
// 당연히 옵져버를 등록 및 해제할 수 있는 메소드와 프로퍼티가 들어있습니다.
interface Observable {
  observers: Observer[]
  addObserver: (observer: Observer) => void
  deleteObserver: (observer: Observer) => void
}

class Weather implements Observable {
  temp: number;
  rain: boolean;
  humidity: number;
  // Observer의 구현체라면 어떤 객체라도 상관없이 받아 들입니다!
  observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  deleteObserver(targetObserver: Observer) {
    this.observers = this.observers.filter(observer => observer.id !== targetObserver.id);
  }

  setWeather(temp, rain, humidity) {
    this.temp = temp;
    this.rain = rain;
    this.humidity = humidity;

    // Observer 구현체라면 반드시 update를 가지고 있습니다!
    observers.forEach(observer => observer.update(temp, rain, humidity))
  }
}

///////////// runtime 환경...
// 인스턴스들의 정보는 적당히 있다고 가정하겠습니다...
const deviceA = new Display();
const deviceB = new Display();
const deviceC = new Display();
const weatherInfo = new Weahter();

weatherInfo.addObserver(deviceA);
weatherInfo.addObserver(deviceB);
weatherInfo.addObserver(deviceC);
// observer로 등록된 deviceA B C 에 모두 정보가 전달됩니다!
weatherInfo.setWeather(12, false, 89);
// 이제 프로그램 내부에서 동적으로 observer를 추가 및 제거할 수 있습니다!
weatherInfo.deleteObserver(deviceB);
```

이제는 Display 뿐만이 아니라 어떤 객체도 Observer가 될 수 있게 되었고!

코드를 직접 바꿔주지 않아도 Observer를 등록 및 제거 할 수 있습니다!

코드가 어떤 상황에도 유연하게 받아들일 수 있도록 바뀌었습니다!!

하지만, update 함수의 argument가 정해져있어 해당 데이터를 사용하는 객체만 사용할 수 있습니다,,,

즉, 날씨 정보가 필요없는 객체들은 사용할 수 없다는 것이죠...!

이러면 Observer로 추상화한 이유가 없습니다.

문제는 update에 넘겨줄 데이터를 Observable이 정해주고 있다는 것입니다.

구독당하는 객체인 Weather가 temp, rain, humidity 데이터를 가지고 있기 때문에 넘겨주는 데이터도 저 3가지로 맞춰졌습니다.

하지만, Weather 입장에선 추상화된 Observer가 어떤 객체인지 알 수 없기 때문에 넘겨주는 데이터를 정하는 것은 좋지 못합니다.

만약, 넘겨줘야 되는 정보가 변하면 그 또한, 손으로 직접 고쳐줘야 하기 때문이지요...

<u>**따라서, Observable 쪽에선 모든 데이터를 넘겨주고 Observer가 그 데이터 중에 필요한 것을 취하는 방법으로 하는 것이 좋겠습니다!**</u>

이렇게 하면 어떤 Observer가 오든, 자신이 데이터를 알아서 취할 테니 구독 등록 및 해제만 하면 모든 것은 문제 없이 돌아갑니다!

한번 고쳐보겠습니다!

```typescript
interface Observer {
  // 이제 update는 어떤 paramter든 받아들일 수 있습니다!
  update: (...parameter: any) => void
}

class Display implements Observer {
  update(...paramter) {
    // update의 parameter에서 필요한 정보만 가져왔습니다!!!!!!
    const { temp, rain, humidity } = paramter;
    setDisplay(temp, rain, humidity);
  }
}

class Weather {
  setWeather(temp, rain, humidity) {
    this.temp = temp;
    this.rain = rain;
    this.humidity = humidity;

    // update는 어떤 paramter라도 받아들입니다!
    observers.forEach(observer => observer.update(temp, rain, humidity))
  }
}
```

이제 Observable 객체는 변화할 시 update를 통해 자신이 원하는 정보를 마음대로 Observer에게 전달할 수 있고, 어떤 Observer 객체든 받아들일 수 있습니다.

그리고 각 Observer 객체는 Observable이 어떤 정보를 주든 그 정보 중에 자신이 필요한 정보를 취사선택해서 가져갈 수 있습니다.

Observable 객체와 Observer 객체는 서로 뭘 주든 알아서 하기 때문에 서로에게 구속적이지 않고 그 자체로 주체적인 객체가 되었습니다.

이렇게 **느슨한 결합**을 가진 코드는 변화에 굉장히 유연합니다!!

변화에 유연한 코드는 좋은 코드라고 할 수 있죠!! 프로그래머가 지향해야 마땅합니다.

# 팩토리 패턴

팩토리라는 말처럼 인스턴스를 만들어내는 객체 공장을 만드는 것을 말합니다!

사실 JavaScript나 Java에서 new를 사용하면 인스턴스를 생성할 수 있는데 굳이 팩토리 패턴이 필요한 이유가 뭔지 알아보겠습니다!

## 팩토리 패턴을 적용하지 않았을 때

피자 가게에서 피자를 만드는 것을 코드로 만들어 보겠습니다.

```typescript
class PizzaStore {
  // 여러 종류의 Pizza를 아우르는 interface입니다.
  pizza: Pizza;

  orderPizza(type: string) {
    if (type === 'cheese') {
      pizza = new CheesePizza();
    } else if (type === 'greek') {
      pizza = new GreekPizza();
    } else if (type === 'peperoni') {
      pizza = new PepperoniPizza();
    }

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.pack();
    return pizza;
  }
}
```

PIzzaStore의 orderPizza에서 Pizza interface에 해당하는 여러 종류의 피자를 만듭니다.

여기서 GreekPizza가 잘 안팔리니 빼고, 다른 피자를 넣어보겠습니다.

```typescript
orderPizza(type: string) {
  // 피자 구현체를 결정하는 로직이 변경되었습니다.
  if (type === 'cheese') {
    pizza = new CheesePizza();
  } else if (type === 'peperoni') {
    pizza = new PepperoniPizza();
  } else if (type === 'shrimp') {
    pizza = new ShrimpPizza();
  } else if (type === 'chicago') {
    pizza = new ChicagoPizza();
  }

  // pizza를 만드는 과정은 바뀌지 않습니다.
  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.pack();
  return pizza;
}
```

여기서, pizza의 종류를 바꾸려면 orderPizza에서 직접 코드를 수정해야합니다.

하지만, orderPizza 안에선 바뀌지 않는 코드가 혼재 되어 있습니다! 코드를 분리해야 할 것 같습니다!

두가지의 원칙에서 코드를 분리합니다.

1. 변경에는 닫혀있고 확장에는 열려있어야 한다.
2. 관심사의 분리

orderpizza에서는 크게 피자 종류를 결정하는 부분, 피자를 만들어 return하는 부분으로 나눌 수 있습니다.

여기서 피자 종류를 결정하는 부분이 변경되는 부분이기 때문에 캡슐화하도록하겠습니다.

## Simple Factory Pattern

```typescript
class PizzaStore  {
  factory: SimplePizzaFactory;

  constructor (factory: SimplePizzaFactory) {
    this.factory = factory;
  }

  orderPizza(type: string) {
    // 이제 피자 종류를 결정하는 작업을 SimplePizzaFactory라는 객체에 위임했습니다.
    // 이제 피자 종류를 추가, 제거를 위해 orderPizza를 수정하지 않아도 됩니다!!!!
    const pizza: Pizza = factory.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.pack();

    return pizza;
  }
}
```

이제 SimplePizzaFactory라는 객체가 createPizza라는 메소드를 통해 Pizza의 인스턴스를 대신 만들어 줍니다.

이렇게 <u>어떤 인터페이스의 인스턴스를 대신 생성해주는 패턴을 **팩토리 패턴** 이라고 하고</u>

그 중에 <u>하나의 간단한 Factory 객체를 통해 인스턴스를 만드는 것을 **Simple Factory Pattern**</u>라고 합니다.

이제 피자 종류를 수정하기 위해 orderPizza를 수정하지 않아도 됩니다!

## Factory method Pattern

여기서 PizzaStore를 확장해보도록 해보겠습니다!

```typescript
// PizzaStore가 SimplePizzaFactory의 인스턴스에 종속되었습니다.
const nyFactory: SimplePizzaFactory = new NYPizzaFactory();
nyStore = new PizzaStore(nyFactory);
nyStore.orderPizza("Veggie");

const chicagoFactory: SimplePizzaFactory = new ChicagoPizzaFactory();
chicagoStore = new PizzaStore(chicagoFactory);
chicagoStore.orderPizza("Veggie");
```

위 코드를 보면, SimplePizzaFactory가 PizzaStore의 종류를 정해주고 있습니다.

외부에 의존하는 객체는 좋지 못합니다.

맥락에도 맞지 않을 뿐더러, 이해하기도 힘들어 가독성도 해치게 됩니다.

또한, 어떠한 PizzaStore든, 그냥 PizzaStore이기 때문에 해당 객체의 종류를 구분하는 것도 쉽지 않습니다.

마지막으로, 모든 PizzaStore를 아우르는 pizza 종류를 SimplePizzaFactory에서 구현해야하는데, 이는 쓸데없이 비효율적입니다.

따라서, 수정해보겠습니다.

우선, PizzaStore와 피자 제작 코드를 하나로 묶어야 합니다.

Chicago의 PizzaStore에선 자신들만의 Pizza만을 만들 것이기 때문입니다.

정확히 필요한 로직만을 남길 수 있습니다.

```typescript
class PizzaStore {
  orderPizza() {
    const pizza: Pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.pack();

    return pizza;
  }

  createPizza(type: string) {
  }
}

class ChicagoPizzaStore extends PizzaStore {
  // factory에 위임했던 createPizza를 PizzaStore로 가져왔습니다.
  createPizza(type: string) {
    if (type === 'cheese') {
      return new ChicagoCheesePizza();
    } else if (type === 'veggie') {
      return new ChicagoVeggiePizza();
    } else if (type === 'pepperoni') {
      return new ChicagoPepperoniPizza();
    }
  }
}

class NYPizzaStore extends PizzaStore {
  // 각각 자기만의 Pizza를 설정합니다.
  createPizza(type: string) {
    if (type === 'cheese') {
      return new NYCheesePizza();
    } else if (type === 'veggie') {
      return new NYVeggiePizza();
    } else if (type === 'pepperoni') {
      return new NYPepperoniPizza();
    }
  }
}
```

위 코드를 통해 PizzaStore의 확장과 함께 pizza 인스턴스를 만드는 메소드를 성공적으로 확장했습니다.

이렇게 변화에는 닫혀있고 확장에는 열려있는 코드를 만들었습니다!

이런 <u>특정 인스턴스를 만들어주는 메소드를 사용하는 패턴을 **팩토리 메소드 패턴**</u>이라고 합니다.

## 추상 팩토리 패턴

<u>**추상 팩토리 패턴**은 여러 팩토리 메소드를 가지고 있는 팩토리 객체를 사용하는 패턴</u>입니다.

Pizza는 여러가지 재료가 필요한데 여러 재료들을 만들어주는 Factory를 만들어보겠습니다.

```typescript
interface PizzaIngredientFactory {
  createSauce: () => Sauce;
  createVeggie: () => Veggie;
  createCheese: () => Cheese;
  createPepperoni: () => Pepperoni;
}

class ChicagoPizzaIngredientFactory implements PizzaIngredientFactory {
  // Sauce의 구현체인 ChicagoSauce를 반환!
  createSauce() {
    return new ChicagoSauce();
  }

  createVeggie() {
    return new ChicagoVeggie();
  }

  createCheese() {
    return new ChicagoCheese();
  }

  createPepperoni() {
    return new ChicagoPepperoni();
  }
}

class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  // Sauce의 구현체인 NYSauce를 반환!
  createSauce() {
    return new NYSauce();
  }

  createVeggie() {
    return new NYVeggie();
  }

  createCheese() {
    return new NYCheese();
  }

  createPepperoni() {
    return new NYPepperoni();
  }
}
```

이제 ingredientFactory를 이용해 Pizza를 만들어보겠습니다.

```typescript
class Pizza {
  // 이 메소드에서 재료들을 준비합니다.
  prepare() {
  }
}

class CheesePizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;

  // 각 지점의 ingredientFactory 종류에 따라 재료가 변합니다!
  constructor(ingredientFactory: PizzaIngredientFactory) {
    this.ingredientFactory = ingredientFactory;
  }

  // 치즈 피자에서 필요한 재료만 만들어 저장합니다. (굳이 PizzaIngredientFactory의 모든 메소드를 사용할 필요는 없습니다.)
  prepare() {
    sauce = ingredientFactory.createSauce();
    cheese = ingredientFactory.createCheese();
  }
}

class VeggiePizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;

  // 각 지점의 ingredientFactory 종류에 따라 재료가 변합니다!
  constructor(ingredientFactory: PizzaIngredientFactory) {
    this.ingredientFactory = ingredientFactory;
  }

  // 야채 피자에서 필요한 재료만 만들어 저장합니다.
  prepare() {
    sauce = ingredientFactory.createSauce();
    veggie = ingredientFactory.createVeggie();
  }
}
```

이제 지점에서 피자를 만들어 보겠습니다!

```typescript
class NYPIzzaStore extends PizzaStore {
  createPizza(item: string) {
    const pizza: Pizza = null;
    // NY만의 재료를 만들어주는 NYPizzaIngredientFactory를 만들었습니다!
    ingredientFactory = new NYPizzaIngredientFactory();

    if (type === 'cheese') {
      // 똑같은 CheesePizza이지만, NYPizzaIngredientFactory를 통해
      // NY의 재료를 통해 CheesePizza를 만들어냅니다!
      pizza = new CheesePizza(ingredientFactory);
    } else if (type === 'veggie') {
      pizza = new VeggiePizza(ingredientFactory);
    }

    // ,,,pizza를 만드는 로직....
    return pizza;
  }
}
```

만약, Pizza의 재료들을 직접 코드로 구현했다면, 각 지점을 구분하고 각 지점이 사용하는 재료들의 인스턴스를 직접 return해주는 로직이었을 것입니다.

하지만, ingredientFactory라는 추상 팩토리를 통해 각 Pizza들의 인스턴스 제작 로직을 수정하지 않아도 각 지점에 따른 재료를 구분해서 만들 수 있게 되었습니다!

# 데코레이션 패턴

상속은 mother class를 상속해 코드를 재사용 할 수 있지만 컴파일 되는 순간 정의되어버려 유연하지 못합니다.

그렇게 전략 패턴을 통해 런타임에서도 문제없이 class의 type을 변화시킬 수도 있지만, 데코레이터라는 또다른 유연한 방법도 존재합니다!

### TypeScript로 데코레이션 패턴 구현해보기

구현 후기, 역시 JS는 함수형 언어이다...

![Code Sanbox](https://codesandbox.io/s/decorator-pattern-by-typescript-zl14xp?file=/src/index.ts);

# 싱글톤 패턴

애플리케이션에 단 하나의 인스턴스만 생성하고 그것을 전역적으로 접근하여 사용할 수 있도록하는 패턴입니다.

모든 애플리케이션 안에 유일한 인스턴스이기 때문에, 해당 객체는 어떻게 생겼고 현재 어떤 데이터가 들어있는지 까지 직관적으로 파악할 수 있습니다!

또한, 같은 형태의 다른 인스턴스로 인한 참조형 특유의 문제가 없습니다!

## 싱글톤 패턴을 이용시 주의 할 점

바로 <u>**비동기</u>로 싱글톤 객체의 데이터를 다룰 때** 입니다.

<u>이건 비동기로 변수를 다룰 때 주의해야 할 점과 완벽하게 일치합니다.</u>

만약 아래와 같은 상황이 있다고 가정해 보겠습니다.

비동기적으로 singleton의 num을 하나씩 늘려주는 것을 의도한 코드입니다.

```typescript
function Singleton() {
  this.num = 1;
  this.setNum = (num: number) => {
    this.num = num;
  };
}

let singleton: typeof Singleton = new Singleton();

function asyncSetNum(num: number) {
  setTimeout(() => {
    singleton.setNum(num + 1);
    console.log(singleton);
  }, Math.random() * 1000);
}

for (let i = 0; i <= 5; i++) {
  asyncSetNum(singleton.num);
}
```

결과는 5번 모두 num = 2 입니다.

이유는 asyncSetNum에 넣어준 num은 변화되지 않은 채로 모두 1이고, 그 1에 1을 더한 값을 singleton에 계속 set한 것입니다.

이런 간단한 예제 이외에도 singleton의 property를 읽어 변형 시키는 여러 비동기적인 시도가 있을 것입니다.

그럴 때, 비동기 함수가 가진 데이터가 과연 최신 데이터인지는 잘 파악해야 할 것 같습니다!
