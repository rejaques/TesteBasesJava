package com.tokio_marine.teste.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class PageController {

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/registro")
    public String register() {
        return "registro";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }
}

