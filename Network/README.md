# 네트워크 기기

- 라우터
- 레이어2 스위치
- 레이어3 스위치

# 프로토콜

 통신하기 위한 규칙을 “프로토콜"이라고 하며 여러 프로토콜을 조합해 네트워크 아키텍쳐가 된다. 대표적으로 TCP/IP가 있다.

 * **호스트** = 각각의 네트워크 단말들을 “호스트"라고 합니다.

## TCP/IP

요즘은 거의 TCP/IP 프로토콜로 통신합니다.

4계층으로 이루어져있습니다.

(7계층으로 이루어진 OSI 참조 모델이 있지만, 실전에서는 거의 사용되지 않습니다.)

| TCP/IP의 계층 | 설명 | 데이터 명칭 | 주요 프로토콜 |
| --- | --- | --- | --- |
| 애플리케이션 층 | 해당 애플리케이션에서 다룰 데이터 형식과 절차를 결정한다. | 메시지 | HTTP, SMTP, POP3,IMAP4, DHCP, DNS 등 |
| 트랜스포트 층 | 단말 내 적절한 애플리케이션에 데이터를 할당한다.
TCP는 큰 파일을 적절히 분해하기도 한다. | 세그먼트 for TCP
데이터그램 for UDP | TCP, UDP |
| 인터넷 층 | 엔드 투 엔드 통신을 한다.
서로의 위치를 특정하는 역할을 한다. | 패킷 또는 데이터그램 | IP, ICMP, ARP 등 |
| 네트워크 인터페이스 층 | 자유롭게 선택할 수 있는 계층, 반드시 상대방과 맞지 않아도 된다.
물리적인 통신 인터페이스가 이 계층에 속한다. | 프레임 | 이더넷, 무선 LAN(Wi-Fi), PPP 등 |

아래부터 각 계층에 대해서 자세히 알아본다.

## 네트워크 인터페이스 층

역할 : **같은 네트워크 안**에서 데이터를 전송하는 것.

같은 네트워크 안이란...? 하나의 레이어2 스위치에 연결된 나머지 단말들까지의 범위

각 레이어2 스위치는 레이어3 스위치나 라우터에 의해 연결된다.

## 인터넷 층

출발지와 최종 목적지를 연결하는 역할을 합니다. 즉, “엔드투엔드" 통신의 역할을 맡고 있는 것입니다.

여러 네트워크를 연결하는 라우터를 거쳐, 최종 목적지까지의 가는 라우트 과정을 “라우팅"이라고 합니다.

## 트랜스포트 층

데이터를 적절한 애플리케이션에 배분하는 역할을 합니다.

### TCP

트랜스포트 층의 TCP는 엔드투엔드의 신뢰성을 확보해 주는 기능을 합니다.

데이터의 분할과 조립도 담당합니다.

## 애플리케이션 층

어떤 애플리케이션의 기능을 실행하기 위한 데이터의 형식과 처리 절차 등을 결정합니다.

이 계층을 최종으로 0101이 아닌 인간이 볼 수 있는 데이터 형태로 데이터를 표현합니다. (문자, 이미지 등)

여기에 해당하는 여러 프로토콜 중에선 DHCP와 DNS는 특이하게 애플리케이션이 사용하기 위한 프로토콜이 아닌 애플리케이션의 통신을 준비하기 위한 프로토콜입니다.

## 그렇다면 프로토콜은 어떻게 지켜지는 것일까?

**통신을 위한 복수의 프로토콜들을 데이터의 헤더에 붙입니다.** 각각의 정보는 해당하는 프로토콜들을 제어할 수 있는 정보를 담고 있습니다.

상위 프로토콜부터 차례대로 헤더를 추가해 나갑니다.

최종적으론 물리적인 신호로 변환되어 전송됩니다.

### 목적지에 도착한 후에는?

1. 전송된 물리적인 신호는 0101인 디지털 데이터로 바꾸어 데이터를 복원합니다.
2. 이더넷 헤더를 참조해 자기 앞으로 온 데이터인지 확인하고, FCS로 데이터에 오류가 없는지 확인합니다.
3. IP에서 IP 헤더를 참조해 자기 앞으로 온 데이터인지 확인합니다.
4. TCP에서 어느 애플리케이션의 데이터인지 확인합니다.
5. 만약, 웹 서버 애플리케이션이라고 하면, 웹 서버에 애플리케이션에 데이터가 도달해, HTTP 헤더와 그 뒤 데이터 부분을 처리합니다.

## IP (Internet Protocol)

네트워크상의 한 PC에서 다른 PC로 데이터를 전송하는 역할을 맡습니다.

IP 프로토콜의 IP 주소를 통해 출발지와 도착지를 정확히 특정해냅니다.

라우터가 IP 프로토콜을 보고 목적지까지 “라우팅"합니다.

### IP 주소 할당 규칙

호스트을 정확히 특정하는 IP 주소는 그럼 어떻게 할당되는 것일까??

보통 그 호스트 자체를 특정하여 IP 주소가 주어진다고 생각하지만,

실은 호스트의 **네트워크 인터페이스를 대상으로 IP 주소가 주어지는 것.**

즉, 유선 이더넷 인터페이스와 무선 LAN 인터페이스가 같이 있는 노트북의 경우엔 각 인터페이스 당 하나씩 IP 주소가 주어지게 된다.

### IP 주소의 구성

IPv4 기준 32비트로 구성되어있고, 보통은 사람들이 구별할 수 있도록 8개씩 4개로 쪼갠 후, 자연수로 전환하여 보여집니다.

8비트 자연수 범위는 0~255입니다.

### 데이터의 목적지가 다수라면?

데이터를 전송하는 목적지에 따라서 3가지로 나눌 수 있다.

- 유니캐스트
    
    단 한 곳으로 데이터를 전송하는 것.
    
    (유니캐스트를 여러번해서 브로드캐스트를 해야겠다라고 생각할 수 있지만, 매우 비효율적이라고 한다.)
    
- 브로드캐스트
    
    같은 네트워크 상의 모든 호스트에 완전히 똑같은 데이터를 전송하는 것.
    
    255.255.255.255 주소가 브로드캐스트를 위한 IP 주소입니다.
    
- 멀티캐스트
    
    특정 그룹에 포함되는 호스트에 완전히 똑같은 데이터를 전송하는 것.
    
    224.0.0.0 ~ 239.255.255.255 주소 범위가 멀티캐스트의 IP주소 범위입니다.
    

## IP 주소의 범위구분

IP 주소는 크게 네트워크를 구별하는 “네트워크부"와 네트워크 내의 호스트를 식별하는 “호스트부"로 나뉘어 있습니다.

이 “네트워크부"와 “호스트부"는 정해져 있는 것이 아닌 가변적입니다.

따라서 어디까지가 네트워크부인지 명시하는 “서브넷 마스크"가 있습니다.

### 서브넷 마스크

IP 주소처럼 32비트이고, 1은 네트워크부, 0은 호스트부를 나타냅니다.

따라서 서브넷 마스크는 반드시 연속한 1과 연속한 0으로 되어있습니다. 1과 0이 교차하는 경우는 없습니다.

**표기법**

- IP주소처럼 8비트로 나누고 각각 자연수로 나누어 보여줍니다.
- 혹은, / 뒤에 연속한 1의 갯수로 표기합니다.

ex) 192.168.1.1 255.255.255.0 혹은 192.168.1.1/24

### 정해진 주소

- 호스트부를 모두 0으로 채우면 네트워크 자체를 식별하기 위한 “네트워크 주소"가 됩니다.
- 호스트부를 모두 1로 채우면 “브로드캐스트 주소"가 됩니다.

## 인터넷에서 사용하는 주소, Private 네트워크에서 사용하는 주소 (용도별 주소)

IP 주소의 용도는 2가지로 나뉩니다.

- 공인 IP 주소 (퍼블릭 IP)
- 사설 IP 주소

### 공인 IP 주소

인터넷에서 통신하기 위해 반드시 필요한 주소입니다.

인터넷 전체에서 중복되지 않는 주소로, 인터넷 접속 서비스를 계약하면, 할당됩니다.

### 사설 IP 주소

LAN 범위내의 주소라고 할 수 있습니다.

사용할 수 있는 IP 주소 범위가 정해져 있는 것이 특징입니다.

- 10.0.0.0 ~ 10.255.255.255
- 172.16.0.0 ~ 172.31.255.255
- 192.168.0.0 ~ 192.168.255.255

이 주소로는 인터넷에서 통신할 수 없고 목적지를 사설 IP 주소로 설정하면 그 데이터는 소멸되어 버립니다.

그렇다면 사설 IP 주소를 가진 호스트가 인터넷을 사용하려면 어떻게 해야할 까요?

### NAT (Network Address Translation)

사설 IP 주소를 해당 호스트가 속한 네트워크의 공인 IP 주소로 치환하여 인터넷에 접속할 수 있도록 합니다.

변환 과정

1. 사설 IP 주소에서 요청을 하면, 출발지의 사설 IP 주소를 공인 IP 주소로 변환합니다.
2. 응답을 다시 받기 위해 변환 기록은 1:1로 NAT 테이블에 저장됩니다.
3. 요청의 응답이 돌아오면, NAT 테이블의 데이터를 토대로 목적지 IP(공인 → 사설)를 반환합니다.

### NAPT (Network Address Port Translation)

위에서 봤듯이 사설 : 공인처럼 1 대 1로 대응 시키려면 사설 주소만큼이나 공인 주소도 많이 필요해집니다.

따라서, NAPT는 복수의 사설 IP를 하나의 글로벌 IP에 대응할 수 있도록 합니다.

## ICMP (Internet Control Message Protocol)

IP의 발전형인 ICMP는 IP가 보장해주지 못하는 데이터 도착 여부와 통신 가능 여부를 보장해줍니다!

ICMP의 주요 2가지 기능은 아래와 같습니다.

- 에러 리포트
    
    폐기한 기기가 ICMP를 이용해 폐기한 IP 패킷의 출발지로 에러 리포트를 전송합니다.
    
- 진단 기능
    
    IP의 엔드투엔드 통신이 가능한지 확인하는 기능입니다.
    
    대표적으로 “ping 커맨드"가 있습니다. ping 커맨드로 ICMP 에코 요청/응답 메시지를 보내서, 지정한 IP 주소와 통신할 수 있는지 확인합니다.
    

### IP의 특징

> “데이터를 보내기 위해선 최선을 다하겠지만, 안되면 어쩔 수 없지”

IP의 특징을 한마디로 표현하자면 위와 같습니다.

## ARP

인터넷에선 IP 주소로 목적지를 특정하지만, PC나 서버 등의 인터페이스는 MAC 주소로 식별합니다.

이 IP 주소와 MAC 주소를 대응시키는 것이 ARP의 역할입니다.

그리고 IP 주소와 MAC 주소를 대응시키는 것을 “주소 해석"이라고 합니다.

(IP 주소는 각 인터페이스마다 할당되기 때문에 MAC 주소에 1대1로 대응됩니다.)

### ARP의 동작 흐름

1. **같은 네트워크 내**의 IP 주소에 ARP 요청으로 대응하는 MAC 주소 질의 요청을 브로드캐스트합니다.
2. 질의 받은 IP 주소를 받은 호스트가 ARP 응답으로 MAC 주소를 알려줍니다.
3. 주소 해석한 IP 주소와 MAC 주소의 대응을 ARP 캐시에 보존합니다.

## Port

호스트에서 동작하는 애플리케이션에 데이터를 배분하기 위해선 애플리케이션을 특정할 수 있어야하는데, **“포트 번호"로 애플리케이션을 식별**합니다.

TCP 혹은 UDP 헤더에 포트 정보가 있습니다.

포트 번호는 16비트로 0 ~ 65535 범위입니다. 범위마다 의미가 있습니다.

### 포트 번호 범위

| 명칭 | 포트 번호 범위 | 의미 |
| --- | --- | --- |
| Well-known port (웰노운 포트) | 0 ~ 1023 | 서버 애플리케이션용으로 예약된 포트 번호 |
| Registered post(등록된 포트) | 1024 ~ 49151 | 자주 이용되는 애플리케이션의 서버 쪽 포트 번호 |
| 동적 / 사설 포트 | 49152 ~ 65535 | 클라이언트 애플리케이션용 포트 번호 |

### 웰노운 포트

미리 정해져 있는 포트로 특히 중요한 포트입니다!

서버 애플리케이션을 실행하면, 웰노운 포트 번호로 클라이언트 애플리케이션의 요청을 기다립니다.

(여기서 서버 애플리케이션이란...?)

### 등록된 포트

웰노운 포트 이외에 자주 이용되는 서버 애플리케이션을 식별하기 위한 포트 번호입니다.

미리 정해져 있는 포트입니다.

### 동적 / 사설 포트

클라이언트 애플리케이션을 식별하기 위한 포트번호 입니다.

클라이언트 애플리케이션이 통신할 때, 동적으로 할당됩니다.

### 주요 웰노운 포트 번호

| 프로토콜 | TCP | UDP |
| --- | --- | --- |
| HTTP | 80 |  |
| HTTPS | 443 |  |
| SMTP | 25 |  |
| POP3 | 110 |  |
| IMAP4 | 143 |  |
| FTP | 20 / 21 |  |
| DHCP |  | 67 / 68 |