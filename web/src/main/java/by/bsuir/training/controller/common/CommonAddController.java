package by.bsuir.training.controller.common;

import by.bsuir.training.entites.Request;
import by.bsuir.training.entites.Role;
import by.bsuir.training.entites.User;
import by.bsuir.training.entites.files.DatabaseFile;
import by.bsuir.training.exceptions.FileStorageException;
import by.bsuir.training.service.databasefile.DatabaseFileService;
import by.bsuir.training.service.request.RequestService;
import by.bsuir.training.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.PermitAll;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class CommonAddController {

    private static final String ROLE_DEFAULT = "ROLE_DEFAULT";
    private static final String ERROR_MESSAGE = "This login is already taken";

    private final UserService userService;
    private final DatabaseFileService databaseFileService;
    private final RequestService requestService;

    @Autowired
    public CommonAddController(UserService userService, DatabaseFileService databaseFileService, RequestService requestService) {
        this.requestService = requestService;
        this.userService = userService;
        this.databaseFileService = databaseFileService;
    }

    @PostMapping(value = {"/register"}, consumes = "application/json")
    @PermitAll
    public ResponseEntity<String> register(@RequestBody(required = false) User user) {
        Optional<User> userOptional = userService.getUserByLogin(user.getLogin());
        if(!userOptional.isPresent()) {
            user.setRole(Role.valueOf(ROLE_DEFAULT));
            userService.add(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(ERROR_MESSAGE, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = {"/request"}, consumes = "application/json")
    @Secured({"ROLE_STUDENT", "ROLE_ADMINISTRATOR", "ROLE_DEFAULT","ROLE_TRAINER"})
    public ResponseEntity<String> addRequest(@RequestBody(required = false)Request request, Authentication authentication) {
        List<Request> requestList = requestService.findByUserLogin(authentication.getName());
        if(requestList.stream().filter((Request r)-> r.getRequestType().getValue().equals(request.getRequestType().getValue())).collect(Collectors.toList()).size()==0) {
            requestService.add(request);
            return ResponseEntity.ok("New request is registered");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You already have request of that type!");
        }
    }


    @PostMapping(value = "/uploadImage/{login}")
    @Secured({"ROLE_STUDENT", "ROLE_ADMINISTRATOR", "ROLE_DEFAULT","ROLE_TRAINER"})
    public ResponseEntity<String> uploadImage(@RequestParam(value="file") MultipartFile file, @PathVariable String login) throws FileStorageException {
        Optional<User> userOptional = userService.getUserByLogin(login);
        if (userOptional.isPresent()) {
            DatabaseFile databaseFile = databaseFileService.store(file);
            User user = userOptional.get();
            user.setImage(databaseFile);
            userService.updateExceptPassword(user);
            return ResponseEntity.ok("Image is uploaded");
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
