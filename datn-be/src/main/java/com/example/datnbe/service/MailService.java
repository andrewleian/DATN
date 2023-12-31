package com.example.datnbe.service;

import com.example.datnbe.dto.DataEmailDTO;

import javax.mail.MessagingException;

public interface MailService {
    void sendHtmlMail(DataEmailDTO dataMail, String templateName) throws MessagingException;
}
