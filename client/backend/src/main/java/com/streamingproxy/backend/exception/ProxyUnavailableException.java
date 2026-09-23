package com.streamingproxy.backend.exception;

/** Thrown when the Node.js streaming proxy cannot be reached or returns an unexpected error. */
public class ProxyUnavailableException extends RuntimeException {

    public ProxyUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
