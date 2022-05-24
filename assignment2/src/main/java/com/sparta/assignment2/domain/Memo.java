package com.sparta.assignment2.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Memo extends Timestamped{
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private Long password;

    public Memo(String title, String username, String contents, Long password){
        this.title = title;
        this.username = username;
        this.contents = contents;
        this.password = password;
    }

    public Memo(MemoRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.username = requestDto.getUsername();
        this.contents = requestDto.getContents();
        this.password = requestDto.getPassword();
    }
    public void update(MemoRequestDto requestDto){
        this.username = requestDto.getUsername();
        this.contents = requestDto.getContents();
    }
}
