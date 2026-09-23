package com.streamingproxy.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "proxy.server.url=http://localhost:4000",
        "proxy.server.api-key=test-key",
        "cors.allowed-origins=http://localhost:5173"
})
class VideoStreamControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void missingUrlParamReturnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/videos/stream"))
                .andExpect(status().isBadRequest());
    }
}
