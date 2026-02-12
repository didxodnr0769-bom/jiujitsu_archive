# 아키텍처 가이드 (Architecture Guide)

이 프로젝트는 유지보수성과 확장성을 고려하여 **Clean Architecture** 원칙을 기반으로 설계되었습니다.
기능(Feature) 단위로 모듈화되어 있으며, 각 기능 내부는 3개의 계층으로 분리되어 있습니다.

## 1. 폴더 구조 (Project Structure)

```
src/
├── app/                  # 앱 전역 설정 (DI, Route, Global Components)
├── features/             # 기능별 모듈 (핵심 폴더)
│   ├── auth/             # 인증 기능 (로그인, 회원가입 등)
│   ├── video/            # 비디오 관리 기능
│   └── category/         # 카테고리 관리 기능
├── shared/               # 공통 모듈 (재사용 가능한 코드)
│   ├── infrastructure/   # 공통 인프라 (Axios, Global Store)
│   ├── presentation/     # 공통 UI (Layout, Design System)
│   └── utils/            # 유틸리티 함수
└── pages/                # 라우팅 진입점 (Page 컴포넌트)
```

---

## 2. 계층별 역할 (Layers)

각 `features` 폴더 내부는 다음과 같은 계층 구조를 가집니다.

### 2.1 Domain Layer (비즈니스 로직)

**"무엇을 하는가?"** 를 정의하는 가장 핵심적인 계층입니다.  
프레임워크(React)나 외부 라이브러리에 의존하지 않는 순수 자바스크립트 영역입니다.

- **`usecase/`**: 구체적인 비즈니스 로직을 수행하는 함수들입니다. (예: `loginUseCase`, `addVideoUseCase`)
- **`repository/`**: 데이터 접근을 위한 추상화된 인터페이스 정의입니다. (실제 구현은 Infrastructure에 있음)

### 2.2 Infrastructure Layer (외부 통신)

**"어떻게 하는가?"** 를 구현하는 계층입니다. 실제 데이터 통신이나 저장을 담당합니다.

- **`http/`**: API 서버와 통신하는 실제 구현체입니다. (예: `HttpAuthRepository`)
- **`store/`**: 클라이언트 상태 관리소입니다. (`useAuthStore` 등)

### 2.3 Presentation Layer (사용자 인터페이스)

**"어떻게 보여주는가?"** 를 담당하는 계층입니다. 사용자와 상호작용합니다.

- **`components/`**: 화면을 그리는 React 컴포넌트입니다. (로직을 최소화하고 뷰에 집중)
- **`hook/`**: View와 UseCase를 연결하는 접착제 역할을 합니다. (Component는 Hook을 통해 로직을 실행)

---

## 3. 데이터 흐름 (Data Flow)

1.  **User**가 `Presentation(Component)`에서 버튼을 클릭합니다.
2.  Component는 `Presentation(Hook)`에 정의된 함수를 호출합니다.
3.  Hook은 `Domain(UseCase)`를 실행합니다.
4.  UseCase는 `Domain(Repository Interface)`를 통해 데이터를 요청합니다.
5.  실제로는 `Infrastructure(Http Repository)`가 실행되어 API를 호출합니다.
6.  결과가 역순으로 전달되어 화면에 반영됩니다.

이러한 구조는 **코드의 결합도를 낮추고, 테스트를 쉽게 만들며, 나중에 특정 라이브러리(예: Axios -> Fetch)를 교체하더라도 다른 계층에 영향을 주지 않도록** 합니다.
