package com.streamingproxy.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
        "proxy.server.url=http://localhost:4000",
        "proxy.server.api-key=test-key",
        "cors.allowed-origins=http://localhost:5173"
})
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }
}
