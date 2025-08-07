package com.estonks.projeto.controller;

import org.springframework.web.bind.annotation.*;

import com.estonks.projeto.response.CheckList;

import java.util.ArrayList;
import java.util.List;

@RestController
public class APIController {
  @GetMapping("/api/check")
  public String check() {
    return "";
  }

}