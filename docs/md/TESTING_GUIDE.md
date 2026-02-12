# 테스트 가이드 (Testing Guide)

이 프로젝트는 **Vitest**와 **React Testing Library**를 사용하여 테스트 환경이 구축되어 있습니다.
Clean Architecture 구조에 맞춰 계층별로 테스트 전략을 다르게 가져갑니다.

## 1. 테스트 실행 (Run Tests)

터미널에서 다음 명령어들을 사용하여 테스트를 실행할 수 있습니다.

```bash
# 모든 테스트 실행 (한 번 실행 후 종료)
npm test

# 감시 모드 (파일 변경 시 자동으로 테스트 재실행)
npm test -- --watch

# UI 모드 (브라우저에서 테스트 결과 및 코드 커버리지 확인)
npm test -- --ui

# 코드 커버리지 확인 (전체 테스트 실행 후 커버리지 리포트 출력)
npx vitest run --coverage
```

---

## 2. 테스트 환경 및 설치 항목

이 프로젝트의 테스트를 위해 다음 패키지들이 설치되어 있습니다.

### 필수 패키지

- **`vitest`**: 빠르고 현대적인 Unit/Integration 테스트 프레임워크 (Vite 기반).
- **`@testing-library/react`**: React 컴포넌트를 사용자 관점에서 테스트하기 위한 라이브러리.
- **`@testing-library/user-event`**: 클릭, 입력 등 실제 사용자 이벤트를 시뮬레이션하는 도구.
- **`@testing-library/jest-dom`**: DOM 요소에 대한 Custom Matcher (`toBeInTheDocument` 등) 제공.
- **`jsdom`**: Node.js 환경에서 브라우저 DOM을 시뮬레이션.

### 커버리지 측정 패키지

- **`@vitest/coverage-v8`**: V8 엔진 기반의 고성능 코드 커버리지 측정 도구.

---

## 3. 코드 커버리지 (Code Coverage)

### 3.1 커버리지란?

테스트 코드가 실제 소스 코드를 얼마나 실행하고 검증했는지를 나타내는 지표입니다.
높은 커버리지는 버그 발생 가능성을 낮추고 리팩토링의 안정성을 보장합니다.

- **Statements (구문):** 코드의 각 구문이 실행되었는지 여부.
- **Branches (분기):** `if`, `switch`, 삼항 연산자 등의 모든 조건 분기가 실행되었는지 여부. (가장 중요)
- **Functions (함수):** 함수가 최소 1회 이상 호출되었는지 여부.
- **Lines (라인):** 소스 코드의 각 라인이 실행되었는지 여부.

### 3.2 커버리지 확인 방법

터미널에서 다음 명령어를 실행하면 프로젝트 전체의 커버리지 리포트를 확인할 수 있습니다.

```bash
npx vitest run --coverage
```

**출력 예시:**

```text
 % Coverage report from v8
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |   96.26 |    91.83 |    92.5 |   97.05 |
 features/auth/...     |     100 |      100 |     100 |     100 |
 ...
```

---

## 4. 계층별 테스트 전략

### 4.1 Domain & UseCase (Unit Test)

UI나 외부 API와 독립적인 **순수 비즈니스 로직**을 테스트합니다. 가장 빠르고 작성하기 쉽습니다.

- **대상:** `src/features/**/domain/usecase/*.js`
- **전략:** `Repository`를 Mocking하여 로직의 흐름과 반환값을 검증합니다.
- **파일 위치:** 같은 폴더 내 `*.test.js`

**예시 (`loginUseCase.test.js`):**

```javascript
import { describe, it, expect, vi } from "vitest";
import { loginUseCase } from "./loginUseCase";

describe("loginUseCase", () => {
  it("should call repository and return token", async () => {
    // 1. Arrange (준비)
    const mockRepo = { getTokenByIdPw: vi.fn() };
    mockRepo.getTokenByIdPw.mockResolvedValue({ token: "abc" });
    const login = loginUseCase(mockRepo);

    // 2. Act (실행)
    const result = await login("user", "pass");

    // 3. Assert (검증)
    expect(mockRepo.getTokenByIdPw).toHaveBeenCalledWith("user", "pass");
    expect(result).toEqual({ token: "abc" });
  });
});
```

### 4.2 Presentation (Component Test)

사용자 인터페이스(UI)가 의도한 대로 렌더링되고 상호작용하는지 테스트합니다.

- **대상:** `src/features/**/presentation/components/*.jsx`
- **전략:** `render`로 컴포넌트를 그리고, `screen`을 통해 요소를 찾아 `fireEvent` 또는 `userEvent`로 사용자 행동을 시뮬레이션합니다.
- **주의:** 실제 비즈니스 로직(UseCase)은 Mocking하여 UI 로직에만 집중하는 것이 좋습니다.

**예시:**

```javascript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

it("should display error message when login fails", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  // 사용자 입력 및 버튼 클릭 시뮬레이션
  await user.click(screen.getByRole("button", { name: "로그인" }));

  expect(screen.getByText("로그인 실패")).toBeInTheDocument();
});
```

### 4.3 Hooks (Custom Hook Test)

화면 없이 로직만 존재하는 리액트 훅을 테스트합니다.

- **대상:** `src/features/**/presentation/hook/*.js`
- **전략:** `@testing-library/react`의 `renderHook`을 사용합니다.

---

## 5. 테스트 작성 원칙

1.  **AAA 패턴:** Arrange(준비) -> Act(실행) -> Assert(검증) 단계를 명확히 구분합니다.
2.  **독립성:** 각 테스트는 서로 영향을 주지 않아야 합니다. (매 테스트마다 Mock 초기화 등)
3.  **가독성:** 테스트 코드도 문서입니다. 명확한 설명을 적어주세요 (`it('should ...')`).
