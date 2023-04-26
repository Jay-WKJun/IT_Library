# React Fiber

fiber는 animation과 반응을 부드럽게 해줍니다. fiber는 work를 chunk로 분류할 수 있고, task의 우선순위를 매겨 진행할 수 있습니다.

핵심은 task를 잘게 쪼개어 일을 진행하다 멈출수도 있고 멈춰놨던 일을 다시 진행하거나 버릴 수도 있는 것 입니다.

이를 통해 더 빠르게 반응하고, 부드럽고 자연스러운 UX를 제공할 수 있습니다.

Fiber는 계속해서 논의되고 있는 주제이고 v.18에서 alpha 버전으로 적용되었습니다.

## 무엇을 해결하기 위해 나온 것일까?

component는 기본적으로 Tree 구조로 recursive하게 DOM을 순회하여 작업합니다.

그렇게 되면, 싱글 스레드 언어인 JS에선 call stack에 component 작업들이 마구 쌓이게 되고, DOM render가 끝날 때 까지, call stack을 점유하고 있어, 다른 작업들을 할 수 없습니다.

또한, call stack에 너무 많이 쌓이면 stack overflow가 일어나게 됩니다.

이를 해결하고자, React Fiber 개념이 나오게 됐습니다.

React Fiber는 일종의 Linked List로 이어진 List를 순회하며 하나씩 처리할 수 있으며, 현재 처리중인 Node를 기억할 수 있기 때문에, 작업을 도중에 멈추고 다른 일을 할 수도 있습니다.

- Linked List 자료 구조를 통해 call stack을 점유하지 않고, stack overflow를 방지할 수 있습니다.
- 작업을 도중에 멈추고 다른 일을 할 수 있습니다.

### reconcilation이란?

> 하나의 Tree에서 다른 Tree와 다른 부분을 바꿔주는 리액트 알고리즘

필요할 때 전체 App을 re-render하는 것이 React의 기본이지만, 그것은 굉장히 cost가 많이 들기 때문에 거의 금지된 작업입니다.

하지만, React는 이것을 최적화해서 전체 App을 re-render하면서도 performance를 유지할 수 있게 해주는 작업을 통틀어 "reconciliation"이라고 합니다.

그리고 이 Reconciliation 알고리즘은 흔히 "Virtual DOM"이라고 알려져있습니다.

길게 풀어 설명하자면, React Application이 만들어 질 때, node tree를 만들게 되고 이것을 메모리에 저장합니다. 그리고 렌더 환경에서 flush 됩니다.
그리고 app이 update되면 새로운 tree를 만들고 이것을 기존 tree와 비교해서 바뀐 부분만 update합니다.

이런 reconciliation은 react-fiber가 나오기 전에도 같은 원리로 작동됩니다.
비록 react-fiber가 reconciliation을 완전히 바꾸기 위해 나왔다고 해도 말이죠.
키포인트는 다음과 같습니다.

- component type이 다르면, diff하지 않고 모두 replace해버립니다.
- list의 경우 key를 대조합니다. 없으면 바뀐 부분 이후로 모두 교체됩니다.

### render enviroment

React는 같은 문법으로 DOM에서도 iOS나 Android같은 환경에서도 렌더링됩니다. 이것을 render enviroment라고 합니다.

이게 가능한 이유는 reconciliation과 rendering이 다른 phase로 되어있기 때문입니다.

reconciliation은 가상의 tree를 대조하는 것이고, render phase에선 완성된 tree를 실제에 적용하는 일만 합니다.

따라서 react/core에서 제공하는 reconciliation 알고리즘을 공유하면서 환경에 맞는 render phase만 바꿔주면 DOM에서도 native 환경에서도 사용할 수 있습니다.

하지만 Fiber로 reconciliation이 크게 바뀌었고, Fiber의 장점을 활용하기 위해 renderer 또한 바뀌어야합니다.

### scheduling

render에는 순서가 있습니다. animation같은 것들은 최대한 빨리 처리되야하고, network 통신 같은 side-effect는 제일 늦게 처리되어야 합니다.

이런 process가 언제 수행되어야하는지 결정해주는 것을 [scheduling](https://github.com/acdlite/react-fiber-architecture?utm_source=hashnode.com#scheduling)이라고 하고 [React Design Principles](https://facebook.github.io/react/contributing/design-principles.html#scheduling) 에 기반하여 구현됩니다.

지금까지는 완벽하게 구현된 것은 아니었지만, Fiber의 등장으로 Fiber의 장점을 활용하기 위해 바뀌어야합니다.

# React Fiber란?

역시 개발자들이 가장 잘 설명해준다. 진리는 단 한곳에 있다.

[react-fiber 공식문서](https://github.com/acdlite/react-fiber-architecture?utm_source=hashnode.com#react-fiber-architecture)
[geeksforgeeks what is react fiber](https://www.geeksforgeeks.org/what-is-react-fiber/)

React Fiber의 목표는 이것입니다.

- 일을 멈췄다가 나중에 다시 돌아와서 할 수 있다.
- 일의 type에 따른 우선순위를 정할 수 있다.
- 예전에 완료된 일을 그대로 사용할 수 있다.
- 필요없는 일은 버릴 수 있다.

이를 위해선, 일을 하나의 단위로 나누어야하는데, 이 일의 한 단위를 'fiber'라고 할 수 있습니다.

일을 나누었으면, 일을 진행해야하는데, JS는 call stack이라는 것을 single thread로 사용하고 있습니다.

하지만, 이것을 중간에 끼어들어 다른 것을 시키거나 할 수 없습니다.

따라서, React만을 위한 stack frame을 만들었는데, 그것이 React Fiber입니다. 한 마디로 **virtual stack frame**이라고 할 수 있습니다.

새로운 stack frame의 장점은 stack frame을 메모리에 남겨 둘 수 있고, 원할 때 실행시킬 수 있다는 것입니다. 이것은 scheduling을 달성하는데 중요한 역할을 합니다.

scheduling 뿐만아니라 concurrency와 error boundary에 대한 가능성도 열립니다.

## fiber의 구조

fiber는 JavaScript object로 컴포넌트에 대한 정보와 Input과 output에 대한 정보를 가지고 있습니다.

### type과 key

reconciliation에서 가장 중요하게 사용되는 type과 key입니다.

(fiber는 element로부터 만들어지므로, type과 key는 결국 element의 정보의 일부입니다.)

type은 class혹은 functional component의 이름 그 자체이고, element의 경우엔 element의 이름 즉, string입니다.

key는 기존 컨셉과 동일하게 fiber가 재사용될 수 있도록해주는 기준입니다.

### child와 sibling

다른 fiber를 가리키는 pointer로 recursive한 fiber의 tree 구조를 설명합니다.

child는 하나의 element만 해당하고, sibling의 경우 여러 child가 있을 경우 해당합니다. (sibling은 fiber를 통해 들어온 새로운 기능입니다.)

return fiber는 현재 process가 종료된 후에 반환되는 다음 program입니다. stack frame에서 다음 node를 나타내는 것으로 tree구조인 fiber에선 parent fiber는 child fiber를 return하게 됩니다.

### pendingProps and memoizedProps

pendingProps는 실행 시작에 set되어있고, memoizedProps은 실행 마지막에 set되어 있습니다.

pendingProps과 memoizedProps이 같은 경우, 이 전의 결과를 그대로 써도 된다는 뜻으로, 불필요한 작업을 방지할 수 있습니다.

### pendingWorkPriority

fiber의 우선순위로, 숫자로 표현됩니다. [ReactPriorityLevel](https://github.com/facebook/react/blob/master/src/renderers/shared/fiber/ReactPriorityLevel.js) 를 통해 list화 됩니다.

NoWork라는 뜻의 0은 가장 낮은 우선순위입니다.

### alternate

flush - fiber를 screen에 render하도록 합니다.

work-in-progress - stack frame이 아직 return되지 않았음을 뜻합니다. = current fiber가 있다는 뜻과 같습니다.

cloneFiber - fiber를 재사용할 때 사용됩니다.

### output

host component

React App의 leaf node입니다. leaf node는 반드시 element를 반환하게 되므로, lowercase tag name을 가지고 있습니다.

모든 fiber는 Output이 있지만, leaf node는 host component에 의해 output으로 반환됩니다.

https://github.com/acdlite/react-fiber-architecture#what-is-a-fiber

https://www.geeksforgeeks.org/what-is-react-fiber/

https://velog.io/@yesbb/virtual-dom%EC%9D%98-%EC%84%B1%EB%8A%A5%EC%9D%B4-%EB%8D%94-%EC%A2%8B%EC%9D%80%EC%9D%B4%EC%9C%A0

https://bumkeyy.gitbook.io/bumkeyy-code/frontend/a-deep-dive-into-react-fiber-internals
