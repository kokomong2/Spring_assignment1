package com.sparta.assignment2.controller;

import com.sparta.assignment2.domain.Memo;
import com.sparta.assignment2.domain.MemoRepository;
import com.sparta.assignment2.domain.MemoRequestDto;
import com.sparta.assignment2.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class MemoController {

    private final MemoRepository memoRepository;
    private final MemoService memoService;

    @GetMapping("/api/memos")
    public List<Memo> getMemos(){
        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();
        return memoRepository.findAllByModifiedAtBetweenOrderByModifiedAtDesc(start, end);
//        return memoRepository.findAllByOrderByModifiedAtDesc();
    }

    @PostMapping("/api/memos")
    public Memo postMemos(@RequestBody MemoRequestDto requestDto){
        Memo memo = new Memo(requestDto);
        return memoRepository.save(memo);
    }

    @PutMapping("/api/memos/{id}")
    public Long updateMemos(@PathVariable Long id, @RequestBody MemoRequestDto requestDto){
        return memoService.update(id,requestDto);
    }

    @DeleteMapping("/api/memos/{id}")
    public Long deleteMemos(@PathVariable Long id){
        memoRepository.deleteById(id);
        return id;
    }

    @GetMapping("/api/memos/password/{id}")
    public Long getPassword(@PathVariable Long id){
        Memo memo = memoRepository.findById(id).orElseThrow(
                ()->new NullPointerException("아이디가 존재하지 않습니다")
        );
        return memo.getPassword();
    }
    @GetMapping("/api/memos/{id}")
    public Memo getById(@PathVariable Long id){
        Memo memo = memoRepository.findById(id).orElseThrow(
                ()->new NullPointerException("아이디가 존재하지 않습니다")
        );
        return memo;
    }
}
