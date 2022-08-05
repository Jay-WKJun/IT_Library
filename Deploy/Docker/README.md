# Docker

> Docker is an open source platform for building, deploying, and managing containerized applications. - by. Docker

> Docker는 콘테이너 기반 애플리케이션을 관리, 배포, 빌딩하기 위한 오픈소스 가상화 플랫폼입니다. - Docker 공홈

배포된 로직들은 그 실행환경들이 설정되어야 하는데, 프론트엔드, 백엔드, DB 등 서로서로 실행환경이 다르고,

빌드시의 환경도 어떤 하드웨어서, 어떤 OS에서, 그 버전에 따라서 또 다르기 때문에 그 환경을 제어해 줄 필요가 있습니다.

즉, 특정 실행 파일 또는 스크립트를 위한 실행 환경을 간단하게 제어해줄 수 있는 것이 Docker입니다.

## Docker가 필요한 이유 (과거부터 현재까지 배포 환경의 변화)

ref: [https://kubernetes.io/ko/docs/concepts/overview/what-is-kubernetes/](https://kubernetes.io/ko/docs/concepts/overview/what-is-kubernetes/)

![container_evolution.svg](./assets/container_evolution.svg)

1. 전통적인 배포시대

   하나의 물리 서버에 여러 애플리케이션을 실행, 하지만 각 애플리케이션에 할당하는 자원을 제어할 수 없어 여러 물리 서버를 두어 제어하였습니다.

2. 가상화 시대

   그 해결책으로 가상화가 도입되었다. 하나의 물리 서버 CPU 위에서 여러 가상 시스템(VM)을 실행하여 사용할 수 있게 되었다.

   각 가상 시스템(VM)은 서로 침범 할 수 없고, 따라서 VM간 애플리케이션을 격리할 수 있어 일정 수준의 보안성을 제공할 수 있게 되었다.

   하나의 서버를 VM을 통해 효율적으로 사용할 수 있게 되었고, 서로 격리되어 관리됨으로서 훨씬 쉽게 애플리케이션을 추가하거나 업데이트 할 수 있게 되었다.

   하지만, 각 VM은 각각의 자체 운영체제를 포함한 하나의 완전한 머신으로, VM마다 운영체제가 필요하여 굉장히 무거워지게된다.

3. 컨테이너 시대

   컨테이너는 VM과 유사하지만, 격리 속성을 완화하여 애플리케이션간에 운영체제를 공유한다. VM과는 다르게 각 컨테이너는 OS를 포함하지 않기 때문에 훨씬 가볍고 빠르다.

   컨테이너도 VM처럼 자체 파일 시스템, CPU 점유율, 메모리, 프로세스 공간 등이 있다.

   기본 인프라와의 종속성을 끊었기 때문에, 클라우드나 OS 배포본에 모두 이식할 수 있다.

### Docker Image

해당 환경은 Docker Image라는 일종의 container 실행을 위한 환경 save file이라고 할 수 있습니다.

Image 파일은 Git처럼 version을 붙여 관리되고, 기본이 되는 Base Image에서 버전의 내용에 따라 바뀐 부분만 적용하여 이미지를 생성합니다.

이 각 버전 별 이미지들을 **“레이어"**라고 합니다.

### Docker Container

Docker Image를 실행한 상태를 **“컨테이너”**라고 합니다.

# Dockerfile 자세히 보기

## FROM

어떤 이미지를 기반으로 이미지를 생성할지 설정합니다.

Dockerfile로 이미지를 생성할 때는 항상 기존에 있는 이미지를 기반으로 생성하기 때문에 FROM은 반드시 설정해야 합니다. 반드시 가장 앞에 와야합니다.

```tsx
FROM <이미지> 또는 FROM <이미지>:<태그>
```

## MAINTAINER

이미지를 생성한 사람의 정보를 설정합니다.

```tsx
MAINTAINER <작성자정보>
```

## RUN

FROM에서 설정한 이미지 위에서 스크립트 혹은 명령을 실행합니다.

여기서 RUN으로 실행한 결과가 새 이미지로 생성되고, 실행 내역은 이미지의 히스토리에 기록됩니다.

### 쉘 스크립트 사용

쉘 스크립트 구문을 사용할 수 있습니다.

/bin/sh 실행 파일을 사용하게 됩니다.

```tsx
RUN <명령>
```

### 쉘 스크립트 사용하지 않기

쉘 스크립트를 사용하지 않기 때문에 /bin/sh 실행 파일을 사용하지 않습니다.

```tsx
RUN[("<실행 파일>", "<매개 변수1>", "<매개 변수2>")];
```

RUN으로 실행한 결과는 캐시되며 다음 빌드 때 재사용합니다. —no-cache 옵션으로 캐시하지 않을 수 있습니다.

## CMD

컨테이너가 시작되었을 때, 스크립트 혹은 명령을 실행합니다. 즉, docker run으로 컨테이너를 생성하거나, docker start 명령으로 정지된 컨테이너를 시작할 때, 실행됩니다.

Dockerfile에서 한 번만 사용할 수 있습니다.

### 쉘 스크립트 사용

쉘 스크립트 구문을 사용할 수 있습니다.

/bin/sh 실행 파일을 사용하게 됩니다.

```tsx
CMD <명령>
```

### 쉘 스크립트 사용하지 않기

쉘 스크립트를 사용하지 않기 때문에 /bin/sh 실행 파일을 사용하지 않습니다.

```tsx
CMD[("<실행 파일>", "<매개 변수1>", "<매개 변수2>")];
```

## ENTRYPOINT

컨테이너가 시작되었을 때, 스크립트 혹은 명령을 실행합니다. 즉, docker run으로 컨테이너를 생성하거나, docker start 명령으로 정지된 컨테이너를 시작할 때, 실행됩니다.

Dockerfile에서 한 번만 사용할 수 있습니다.

CMD와 내용이 동일하지만 docker run 시에 차이점이 있습니다.

### 쉘 스크립트 사용

쉘 스크립트 구문을 사용할 수 있습니다.

/bin/sh 실행 파일을 사용하게 됩니다.

```tsx
ENTRYPOINT <명령>
```

### 쉘 스크립트 사용하지 않기

쉘 스크립트를 사용하지 않기 때문에 /bin/sh 실행 파일을 사용하지 않습니다.

```tsx
ENTRYPOINT[("<실행 파일>", "<매개 변수1>", "<매개 변수2>")];
```

## CMD vs ENTRYPOINT

docker run 시에 둘의 동작 방식이 다릅니다!

### CMD의 경우

```bash
// DOCKER FILE
FROM ubuntu:latest
CMD ["echo", "hello"]
```

```bash
$ sudo docker build --tag example
$ sudo docker run example echo world
world
```

**CMD ["echo", "hello"]가 무시**되고 docker run에서 실행한 echo world만 실행되었습니다.

### ENTRYPOINT의 경우

```bash
// DOCKER FILE
FROM ubuntu:latest
ENTRYPOINT ["echo", "hello"]
```

```bash
$ sudo docker build --tag example
$ sudo docker run example echo world
hello echo world
```

**ENTRYPOINT ["echo", "hello"]가 실행**되고 **docker run의 “echo world”가 매개 변수로 처리**되어 echo world로 함께 출력 됩니다.

docker run —entrypoint 옵션을 활용하면 ENTRYPOINT가 무시됩니다.

## EXPOSE

호스트와 연결할 포트 번호를 설정합니다.

docker run —expose 옵션과 동일합니다.

```bash
EXPOSE <포트 번호>
```

EXPOSE는 호스트와 연결만 할 뿐 외부에 노출은 되지 않습니다.

포트를 외부에 노출하려면 docker run -p, -P 옵션을 사용해야 합니다.

## ENV

환경 변수를 설정합니다.

ENV로 설정한 환경 변수는 RUN, CMD, ENTRYPOINT에 적용됩니다.

```bash
ENV <환경 변수> <값>
ENV HELLO 1234
CMD echo $HELLO
```

docker run -e, -env 옵션과 동일합니다. 해당 옵션은 여러번 사용 가능합니다.

```bash
sudo docker run example
1234
sudo docker run -e HELLO=4321 example
4321
```

## ADD

파일을 이미지에 추가합니다.

```bash
ADD <복사할 파일 경로> <이미지에서 파일이 위치할 경로>
```

로컬의 압축 파일(tar.gz, tar.bz2, tar.xz)은 압축을 해제하고 tar를 풀어서 추가됩니다. 단, 인터넷에 있는 파일 URL은 압축만 해제한 뒤 tar 파일이 그대로 추가됩니다.

<복사할 파일 경로> 사용 주의 사항

- <복사할 파일 경로>는 컨텍스트 아래를 기준으로 하며 컨텍스트 바깥의 파일, 디렉터리나 절대 경로는 사용할 수 없습니다.
- 파일 뿐만아니라 디렉터리도 설정할 수 있으며, 디렉터리를 지정하면 디렉터리의 모든 파일을 복사합니다. 또한, 와일드카드를 사용하여 특정 파일만 복사할 수도 있습니다.
- URL 또한 설정할 수 있습니다.

<이미지에서 파일이 위치할 경로>

- 항상 절대 경로 이어야 합니다.
- 마지막에 /가 있으면 디렉터리가 생성되고 파일은 그 아래에 복사됩니다.

## COPY

파일을 이미지에 추가합니다.

ADD와 사용방법이 동일합니다.

ADD와는 달리 COPY는 압축 파일을 추가할 때 압축을 해제하지 않고, 파일 URL도 사용할 수 없습니다.

```bash
COPY <복사할 파일 경로> <이미지에서 파일이 위치할 경로>
```

## VOLUME

디렉터리의 내용을 컨테이너에 저장하지 않고 호스트에 저장하도록 설정합니다.

```bash
VOLUME <컨테이너 디렉터리>
VOLUME ["컨테이너 디렉터리 1", "컨테이너 디렉터리 2"]
```

docker run -v 옵션으로 동일하게 적용할 수 있습니다.

```bash
sudo docker run -v <호스트 디렉터리>:<컨테이너 디렉터리>
sudo docker run -v /root/data:/data example
```

## USER

명령을 실행할 사용자 계정을 설정합니다. RUN, CMD, ENTRYPOINT에 적용됩니다.

```bash
USER <계정 사용자명>
```

## WORKDIR

RUN, CMD, ENTRYPOINT의 명령이 실행될 디렉터리를 설정합니다.

```bash
WORKDIR <경로>
```

**절대 경로 대신 상대 경로도 사용할 수 있습니다.**

### 도중에 경로 바꾸기

상대 경로의 경우 먼저 설정된 WORKDIR의 경로를 기준으로 디렉터리를 변경합니다.

최초 기준은 /입니다.

## ONBUILD

생성한 이미지를 기반으로 다른 이미지가 생설될 때 명령을 실행(trigger)합니다.

최 총에 BNUILD를 사용한 상태에서는 아무 명령도 실행하지 않습니다.

다음 번에 이미지가 FROM으로 사용될 때 실행할 명령을 예약하는 기능이라 할 수 있습니다.

```bash
ONBUILD <Dockerfile 명령> <Dockerfile 명령의 매개 변수>
```

예시)

```bash
// Dockerfile
FROM ubuntu:latest
ONBUILD RUN touch /hello.txt
```

```bash
sudo docker build --tag example
sudo docker run -i -t example /bin/bash
ls
,,,
```

Dockerfile에서 touch /hello.txt를 명령했는데 아무 것도 만들어지지 않았습니다.

이제 만들어진 example 이미지로 새 이미지를 생성합니다.

```bash
FROM example
```

```bash
sudo docker build --tag example2
# Executing 1 build triggers
sudo docker run -i -t example2 /bin/bash
ls
hello.txt
```

docker build 명령을 실행 할 때 # Executing 1 build triggers라고 출력되고 ONBUILD로 설정한 명령이 실행됩니다.

ONBUILD로 작성한 명령이 실행되어 hello.txt가 생성된 것이 확인됩니다.
