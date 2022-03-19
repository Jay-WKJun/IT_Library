# Rendering

web app은 계속 발전해왔고, 그만큼 기능도 많아져 rendering 비용이 많이 무거워졌습니다.

따라서 UX 향상을 위해 브라우저의 rendering 원리를 이해하고 이에 따른 최적화 전략을 알아야 할 필요가 있습니다!

# browser rendering engine

각 브라우저마다 HTML과 CSS 파일을 parsing하고 화면에 그려주는 browser engine이 있습니다.

대략적인 작동방식은 비슷하여, 같은 HTML과 CSS라면 어느 브라우저에서든 비슷하게 화면이 그려지지만, 분명 차이점은 존재합니다. (화면이 에상과는 다르게 그려지는 등의 확연하게 차이나는 점도 존재합니다.)

따라서, web app을 개발한다고 했을 때, 나의 코드가 어느 엔진을 통해 어떻게 그려지는지 알 필요가 있습니다.

다음은 각 브라우저의 engine입니다.

Browser | Engine
--- | ---
FireFox | Gecko
Chrome, Opera (all chromium-based browsers) | bilnk
Safari, All browsers for iOS | webkit
Edge | EdgeHTML -> blink

이외에 개발중인 browser engine인 Servo가 있습니다.

Mozilla 재단에서 Rust로 Samsung과 함께 개발 중이라고 합니다.

ref: https://www.geekboots.com/story/what-is-browser-engine-and-how-does-it-work

# Rendering performance

오늘날 web에서 볼 수 있는 것은 단순한 page가 아니라 application으로 불러도 될 정도로 사용자와 적극적으로 상호작용하는 하나의 완성된 application입니다.

따라서, browser 화면에 보여지는 상호작용들은 매끄럽고 원활히 실행되어야합니다.

성능이 우수한 앱을 만드려면, 브라우저가 HTML, 자바스크립트 및 CSS를 처리하는 방법을 이해하고 작성하는 코드와 포함된 타사 코드가 최대한 효율적으로 실행되도록 보장해야 합니다.

## 픽셀 파이프라인

렌더링을 진행할 때, 다음과 같은 작업들이 연속적으로 진행되게 됩니다.

다만, 파이프라인의 상위 과정을 무시하고 특정 하위 과정부터 작업을 진행하게 할 수도 있습니다.

![pixel pipeline](./assets/pixel_pipeline.jpeg)

- JavaScript

모든 rendering이 진행되기 전에 JavaScript가 먼저 실행됩니다.

따라서, class, id 등을 JavaScript를 통해 DOM에 붙여주면 해당 style이 적용되거나 직접 style attribute를 DOM에 적용해주면 style이 적용되는 것을 볼 수 있습니다.

- 스타일 계산

.headline 또는 .nav > .nav__item 등의 매칭 선택기에 따라 어떤 CSS 규칙을 어떤 요소에 적용할지 계산하는 프로세스입니다.

여기에서 규칙이 알려지면 적용되고 각 요소의 마지막 스타일이 계산됩니다.

- Layout (reflow)

요소의 기하학적인 스타일을 계산합니다.

즉, 요소가 얼마의 크기로 어디에 배치 될 지를 계산합니다.

위치와 크기를 다루기 때문에 한 요소가 다른 요소의 스타일에 영향을 줄 수 있습니다. 또한, 그 요소의 하위 요소들에도 영향을 줍니다. (예를 들어 width: 100%는 상위 요소의 width에 영향을 받습니다.)

- Paint (repaint)

페인트는 픽셀을 채우는 프로세스입니다.

텍스트, 색, 이미지, 경계 및 그림자 등 요소의 모든 시각적 부분을 그리는 작업을 포함합니다. 그리기는 일반적으로 레이어라고 하는 다수의 표면에서 수행됩니다.

모든 프로세스 중 가장 무거운 프로세스 입니다.

- Compositing

여러 잠재적인 레이어로 이루어진 화면을 합성하여 안정적으로 보일 수 있도록 합니다.

translate, opacity가 Compositing부터 trigger하는 css 요소입니다.
